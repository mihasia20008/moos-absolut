import React, {Fragment, PureComponent} from 'react';
import { connect } from 'react-redux';
import { reduxForm, Form } from "redux-form";
import cx from 'classnames';

import CustomDetailLoader from '../../../../components/CustomDetail/Loader';
import CustomDetailHeader from "../../../../components/CustomDetail/Header";
import ProposalForm from '../../../../components/CustomDetail/Form/Proposal'

class CustomAddTask extends PureComponent {
  render() {
    const { isFetching, onCloseForm } = this.props;

    return (
      <div className={cx('row no-gutters flex-nowrap task-form')}>
        <Form className={cx('task-form__wrap block')}>{
          isFetching ? (
            <CustomDetailLoader />
          ) : (
            <Fragment>
              <CustomDetailHeader
                section="Заявка"
                title="Заявка на выпуск банковской гарантии"
                name="Имя компании"
                inn="123456789"
                kpp="123456789"
                ogrn="123456789"
              />
              <div className={cx('block_item-out')}>
                <ProposalForm />
              </div>
              <div className={cx('task-form__footer')}>
                <button
                  type="button"
                  className={cx('btn-form btn-form--none')}
                  onClick={onCloseForm}
                >
                  Отказать
                </button>
                <button type="submit" className={cx('btn-form btn-form--ok')}>
                  Согласовано
                </button>
              </div>
            </Fragment>
          )
        }</Form>
      </div>
    );
  }
}

const mapStateToProps = () => {
  return {
    isFetching: false
  };
};

const formSettings = {
  form: 'addTask',
  enableReinitialize: true
};

export default connect(mapStateToProps)(
  reduxForm(formSettings)(CustomAddTask)
);
