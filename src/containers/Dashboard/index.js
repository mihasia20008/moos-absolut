import React, { PureComponent } from 'react';
import { connect } from 'react-redux';
import cx from 'classnames';

import { getDashboard, clearDashboard } from "../../redux/Dashboard/actions";

class Dashboard extends PureComponent {
    componentDidMount() {
        const { dispatch } = this.props;
        dispatch(getDashboard());
    }

    componentWillUnmount() {
        const { dispatch } = this.props;
        dispatch(clearDashboard());
    }

    render() {
        return (
            <div className={cx('container')}>
                <div className={cx('row')}>
                    <div className={cx('col-12 dash')}>
                        <h1 className={cx('dash__title')}>
                            У вас <span className={cx('task-count')}>738</span> задач.
                        </h1>
                        <h2 className={cx('dash__subtitle')}>
                            Мы сгруппировали их так, чтобы вы могли закрыть их максимально быстро.
                        </h2>
                        <div className={cx('dash__block')}>
                            <div className={cx('dash__block-title')}>
                                Заполнить заявку, анкету и приложить документы
                                <span className={cx('task-count')}>45</span>
                            </div>
                            <div className={cx('d-flex flex-wrap')}>
                                <a className={cx('dash__item')} href="">
                                    ООО «Тракмакс»
                                    <span>32</span>
                                </a>
                                <a className={cx('dash__item')} href="">
                                    ООО «ЭМП»
                                    <span>32</span>

                                </a>
                                <a className={cx('dash__item')} href="">
                                    ООО «Южный рынок»
                                    <span>32</span>
                                </a>
                                <a className={cx('dash__item no')} href="">
                                    ООО «Тракмакс»
                                    <span>32</span>
                                </a>
                            </div>
                        </div>
                        <div className={cx('dash__block')}>
                            <div className={cx('dash__block-title')}>
                                Подписать необходимые документы
                                <span className={cx('task-count')}>45</span>
                            </div>
                            <div className={cx('d-flex flex-wrap')}>
                                <a className={cx('dash__item')} href="">
                                    ООО «Тракмакс»
                                    <span>32</span>
                                </a>
                                <a className={cx('dash__item')} href="">
                                    ООО «ЭМП»
                                    <span>32</span>
                                </a>
                                <a className={cx('dash__item')} href="">
                                    ООО «Южный рынок»
                                    <span>32</span>
                                </a>
                                <a className={cx('dash__item')} href="">
                                    ООО «Тракмакс»
                                    <span>32</span>
                                </a>
                                <a className={cx('dash__item')} href="">
                                    ООО «ЭМП»
                                    <span>32</span>
                                </a>
                                <a className={cx('dash__item')} href="">
                                    ООО «Южный рынок»
                                    <span>32</span>
                                </a>
                                <a className={cx('dash__item')} href="">
                                    ООО «Тракмакс»
                                    <span>32</span>
                                </a>
                                <a className={cx('dash__item')} href="">
                                    ООО «ЭМП»
                                    <span>32</span>
                                </a>
                                <a className={cx('dash__item')} href="">
                                    ООО «Южный рынок»
                                    <span>32</span>
                                </a>

                            </div>
                        </div>
                        <div className={cx('dash__block')}>
                            <div className={cx('dash__block-title')}>
                                Проверка стоп-факторов во внешних источниках
                                <span className={cx('task-count')}>145</span>
                            </div>
                            <div className={cx('d-flex flex-wrap')}>
                                <a className={cx('dash__item')} href="">
                                    ООО «Тракмакс»
                                    <span>32</span>
                                </a>
                                <a className={cx('dash__item')} href="">
                                    ООО «ЭМП»
                                    <span>32</span>
                                </a>
                                <a className={cx('dash__item')} href="">
                                    ООО «Южный рынок»
                                    <span>32</span>
                                </a>
                                <a className={cx('dash__item no')} href="">
                                    ООО «Тракмакс»
                                    <span>32</span>
                                </a>
                            </div>
                        </div>
                        <div className={cx('dash__footer')}>
                            <div className={cx('dash__footer-title')}>
                                Больше всего задач по клиентам
                            </div>
                            <div className={cx('d-flex flex-wrap')}>
                                <div className={cx('dash__footer-item')}>
                                    801
                                    <div className={cx('dash__footer-name')}>
                                        ООО «Траксмакс»
                                    </div>
                                </div>
                                <div className={cx('dash__footer-item')}>
                                    755
                                    <div className={cx('dash__footer-name')}>
                                        ООО «Адамант»
                                    </div>
                                </div>
                                <div className={cx('dash__footer-item')}>
                                    801
                                    <div className={cx('dash__footer-name')}>
                                        ООО «Траксмакс»
                                    </div>
                                </div>
                                <div className={cx('dash__footer-item')}>
                                    755
                                    <div className={cx('dash__footer-name')}>
                                        ООО «Адамант»
                                    </div>
                                </div>
                                <div className={cx('dash__footer-item')}>
                                    801
                                    <div className={cx('dash__footer-name')}>
                                        ООО «Траксмакс»
                                    </div>
                                </div>
                                <div className={cx('dash__footer-item')}>
                                    755
                                    <div className={cx('dash__footer-name')}>
                                        ООО «Адамант»
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        );
    }
}

const mapStateToProps = ({ Dashboard }) => {
    console.log(Dashboard);
    return {};
};

export default connect(mapStateToProps)(Dashboard);
