import React, {Fragment, PureComponent} from 'react';
import PropTypes from 'prop-types';
import {connect} from 'react-redux';
import { reduxForm, Form } from 'redux-form';
import cx from 'classnames';

import _get from 'lodash/get';

import CustomDetailMenu from '../../../components/CustomDetail/Menu';
import CustomDetailLoader from '../../../components/CustomDetail/Loader';

import * as CustomDetailForm from '../../../components/CustomDetail/Form';

import { getTaskForm } from "../../../redux/Task/actions";
import Header from "../../../components/CustomDetail/Header";

class TaskCustomDetail extends PureComponent {
  static propTypes = {
    isFetching: PropTypes.bool.isRequired,
    taskInfo: PropTypes.object,
    id: PropTypes.string.isRequired,
    locationQuery: PropTypes.string.isRequired,
    title: PropTypes.node,
  };

  static defaultProps = {
    taskInfo: {},
    title: <div className={cx('loading__item')} style={{ width: '100%' }} />,
  };

  static isPrincipal(locationQuery) {
    const principalSections = [
      'financial-statements',
      'direction',
      'account-information',
      'management-structure',
      'physical-person',
    ];

    return principalSections.some(section => {
      const regex = new RegExp(`section=${section}`);
      return locationQuery.search(regex) !== -1;
    });
  }

  static isReadOnly(locationQuery, sections = []) {
    const readOnlySections = sections.reduce((acc, section) => {
      if (section.items.length) {
        section.items.forEach(item => {
          if (item.readonly) {
            acc.push(item.slug);
          }
        });
      }
      return acc;
    }, []);

    return readOnlySections.some(section => {
      const regex = new RegExp(`section=${section}`);
      return locationQuery.search(regex) !== -1;
    });
  }

  componentDidMount() {
    const { id, dispatch } = this.props;
    dispatch(getTaskForm(id));
  }

  handleSubmit = (data) => {
    console.log('submit data', data);

    const { onCloseDetail } = this.props;
    onCloseDetail();
  };

  renderFormSection() {
    const { locationQuery, taskInfo } = this.props;

    switch (true) {
      case locationQuery.search(/\?section=account-information/) === 0: {
        return <CustomDetailForm.AccountInfo taskInfo={taskInfo} />;
      }
      // case locationQuery.search(/\?section=financial-statements/) === 0: {
      //   return <CustomDetailForm.FinStatements />;
      // }
      case locationQuery.search(/\?section=proposal/) === 0:
      case locationQuery.search(/\?section=commission/) === 0:
      case locationQuery.search(/\?section=signer/) === 0:
      case locationQuery.search(/\?section=direction/) === 0:
      case locationQuery.search(/\?section=management-structure/) === 0:
      case locationQuery.search(/\?section=financial-statements/) === 0:
      case locationQuery.search(/\?section=physical-person/) === 0: {
        return (
          <div className={cx('block_item-out')}>
            {locationQuery}
          </div>
        );
      }
      default: {
        return <CustomDetailForm.TaskRoot taskInfo={taskInfo} />;
      }
    }
  }

  render() {
    const { isFetching, locationQuery, title, taskInfo, handleSubmit, onCloseDetail } = this.props;

    const { taskHeader = {}, description = {} } = taskInfo;
    const isPrincipal = TaskCustomDetail.isPrincipal(locationQuery);
    const notReadOnly = !TaskCustomDetail.isReadOnly(locationQuery, taskInfo.sections);

    return (
      <div className={cx('row no-gutters flex-nowrap task-form')}>
        <CustomDetailMenu
          title={title}
          sections={taskInfo.sections}
        />
        <Form className={cx('task-form__wrap block')} onSubmit={handleSubmit(this.handleSubmit)}>{
          isFetching
            ? <CustomDetailLoader />
            : (
              <Fragment>
                <Header
                  section={isPrincipal ? 'Принципал' : 'Заявка'}
                  title={description.text}
                  name={taskHeader.principalDisplayName}
                  inn={taskHeader.principalInn}
                  kpp={taskHeader.principalKpp}
                  ogrn={taskHeader.principalOgrn}
                />
                {this.renderFormSection()}
                {notReadOnly && (
                  <div className={cx('task-form__footer')}>
                    <button
                      type="button"
                      className={cx('btn-form btn-form--none')}
                      onClick={onCloseDetail}
                    >
                      Отказать
                    </button>
                    <button type="submit" className={cx('btn-form btn-form--ok')}>
                      Согласовано
                    </button>
                  </div>
                )}
              </Fragment>
            )
        }</Form>
      </div>
    );
  }
}

const mapStateToProps = ({ Task }, ownProps) => {
  const { isFetching, task_name, ...restTaskInfo } = Task;

  return {
    isFetching,
    title: ownProps.title || task_name,
    taskInfo: restTaskInfo,
    initialValues: {
      comment: _get(restTaskInfo, 'comment.value', ''),
      initialCommission: _get(restTaskInfo, 'commission.initialCommission', ''),
      actualCommission: _get(restTaskInfo, 'commission.initialCommission', ''),
      totalCommission: _get(restTaskInfo, 'commission.totalCommission', ''),
      accounts: _get(restTaskInfo, 'accounts', []),
    }
  };
};

const formSettings = {
  form: 'taskDetail',
  enableReinitialize: true
};

export default connect(mapStateToProps)(
  reduxForm(formSettings)(TaskCustomDetail)
);
