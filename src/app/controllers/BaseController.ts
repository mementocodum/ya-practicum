import router from '../../shared/classComponents/router';
import Store from '../../shared/classComponents/store';

export default class BaseController {
    public router: typeof router = router;

    public store: typeof Store = Store;
}
