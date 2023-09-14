import router from '../../shared/classComponents/Router';
import Store from '../../shared/classComponents/Store';

export default class BaseController {
    public router: typeof router = router;

    public store: typeof Store = Store;
}
