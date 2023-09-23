import store, { StoreEvents } from '../classComponents/Store';

export function connect(Component: any): any {
    return class extends Component {
        constructor(...args: any) {
            // не забываем передать все аргументы конструктора
            super(...args);
            // подписываемся на событие
            store.on(StoreEvents.Updated, () => {
                // вызываем обновление компонента, передав данные из хранилища
                const props = Component.mapStateToProps({ ...store.getState() });

                this.setProps({ ...props });
            });
        }
    };
}
