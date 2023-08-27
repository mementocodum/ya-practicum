import { v4 as makeUUID } from 'uuid';
import EventBus from './eventBus';

export interface TProps {
    [index: string]: any,
    children?: Record<string, Block>
}
export default class Block {
    private static EVENTS: Record<string, string> = {
        INIT: 'init',
        FLOW_CDM: 'flow:component-did-mount',
        FLOW_CDU: 'flow:component-did-update',
        FLOW_RENDER: 'flow:render',
    };

    public props: TProps;

    public readonly _id: string | null = null;

    private _reRender: boolean;

    private _prevProps: TProps;

    public _element: HTMLElement;

    private _meta: { tagName: string, props?: TProps } | null = null;

    public templator: Function | undefined;

    public events: Record<string, Function> | any;

    public children: TProps;

    public eventBus: () => EventBus;

    constructor(tagName: string = 'div', props: TProps = {}, templator?: Function | undefined) {
        const eventBus = new EventBus();
        this._meta = {
            tagName,
            props,
        };
        const { children, propsSimple } = this._getChildren(props);

        this._id = makeUUID();

        this.children = children;

        this.events = {};

        this.templator = templator;

        this._reRender = false;

        this.props = this._makePropsProxy({ ...propsSimple, _id: this._id });

        this.eventBus = () => eventBus;

        this._registerEvents(eventBus);

        eventBus.emit(Block.EVENTS.INIT);
    }

    private _registerEvents(eventBus: EventBus): void {
        eventBus.on(Block.EVENTS.INIT, this.init.bind(this));
        eventBus.on(Block.EVENTS.FLOW_CDM, this._componentDidMount.bind(this));
        eventBus.on(Block.EVENTS.FLOW_CDU, this._componentDidUpdate.bind(this));
        eventBus.on(Block.EVENTS.FLOW_RENDER, this._render.bind(this));
    }

    private _createDocumentElement(tagName: string): HTMLElement {
        return document.createElement(tagName);
    }

    private _createResources(): void {
        const tagName = this._meta?.tagName;
        if (tagName) this._element = this._createDocumentElement(tagName);
    }

    public set prevProps(props: TProps) {
        this._prevProps = {...props};
    }

    public init(): void {
        this._createResources();
        this.eventBus().emit(Block.EVENTS.FLOW_RENDER);
    }

    private _componentDidMount(): void {
        this.componentDidMount();
        Object.values(this.children).forEach((child: Block): void => {
            child.dispatchComponentDidMount();
        });
    }

    public componentDidMount(): void { }

    public dispatchComponentDidMount(): void {
        this.eventBus().emit(Block.EVENTS.FLOW_CDM);
    }

    private _componentDidUpdate(oldProps: TProps, newProps: TProps): void {
        const response = this.componentDidUpdate(oldProps, newProps);
        if (!response) return;
        this._render();
    }

    public componentDidUpdate(_oldProps: TProps, _newProps: TProps): boolean {
        return true;
    }

    public setProps = (nextProps: TProps): void => {
        if (!nextProps) {
            return;
        }
        this._prevProps = { ...this.props };
        Object.assign(this.props, nextProps);
    };

    get element(): HTMLElement {
        return this._element;
    }

    private _render(): void {
        const block = this.render();
        this._element.innerHTML = '';

        if (typeof block === 'string') {
            this._element.insertAdjacentHTML('afterbegin', block);
        } else {
            this._element.append(block);
        }
        this._removeEvents();
        this._addEvents();
        this._addAttribute();
    }

    public render(): DocumentFragment | string {
        return '';
    }

    public getContent(): HTMLElement {
        return this.element;
    }

    private _makePropsProxy(props: TProps) {
        const self = this;
        // @ts-ignore
        return new Proxy(props, {
            get(target: TProps, prop: string) {
                const value: unknown = target[prop];
                return typeof value === 'function' ? value.bind(target) : value;
            },
            set(target: TProps, prop: string, value: unknown): boolean {
                // @ts-ignore
                target[prop] = value;
                self.eventBus().emit(Block.EVENTS.FLOW_CDU, self._prevProps, target);
                return true;
            },
            deleteProperty() {
                throw new Error('Нет доступа');
            },
        });
    }

    public _addEvents(): void {
        const { events = {} } = this.props;
        //console.log(events,'ev', this.props)
        Object.keys(events).forEach((eventName) => {
            this.events[eventName] = events[eventName].bind('', this);
            this._element.addEventListener(eventName, this.events[eventName]);
        });
    }

    public _removeEvents(): void {
        if (!this.events) return;
        Object.keys(this.events).forEach((eventName) => {
            this._element.removeEventListener(eventName, this.events[eventName]);
        });
    }

    private _addAttribute(): void {
        const { attr = {} } = this.props;
        Object.entries(attr).forEach(([key, value]) => {
            this._element.setAttribute(key, String(value));
        });
    }

    public compile(props: TProps): DocumentFragment {
        const propsAndStubs = { ...props };
        Object.entries(this.children).forEach(([key, child]: [string, Block]) => {
            // @ts-ignore
            propsAndStubs[key] = `<div data-id="${child?._id}"></div>`;
        });

        const fragment = document.createElement('template');
        fragment.innerHTML = '';
        if (this.templator) fragment.innerHTML = this.templator(propsAndStubs);
        Object.values(this.children).forEach((child: Block) => {
            const stub = fragment.content.querySelector(`[data-id="${child._id}"]`);
            stub?.replaceWith(child.getContent());
        });

        return fragment.content;
    }

    private _getChildren(propsAndChildren: TProps): {
        children: Record<string, Block>,
        propsSimple: Record<string, unknown>
    } {
        const children: Record<string, Block> = {};
        const props: Record<string, unknown> = {};
        Object.entries(propsAndChildren).forEach(([key, value]) => {
            if (value instanceof Block) {
                children[key] = value as Block;
            } else {
                props[key] = value;
            }
        });
        return { children, propsSimple: props };
    }

    public getChildren(propsAndChildren: TProps): {
        children: Record<string, Block>,
        propsSimple: Record<string, unknown>
    } {
        return this._getChildren(propsAndChildren);
    }

    public show(): void {
        const content = this.getContent();
        if (content) content.style.display = 'block';
    }

    public hide(): void {
        const content = this.getContent();
        if (content) content.style.display = 'none';
    }
}
