import React, {PureComponent} from 'react';
import PropTypes from 'prop-types';
import {connect} from 'react-redux';
import { reduxForm, Form } from 'redux-form';
import cx from 'classnames';

import _get from 'lodash/get';

import CustomDetailMenu from '../../../components/CustomDetail/Menu';
import CustomDetailLoader from '../../../components/CustomDetail/Loader';
import CustomDetailHeader from "../../../components/CustomDetail/Header";

import * as CustomDetailForm from '../../../components/CustomDetail/Form';

import { getTaskForm } from "../../../redux/Task/actions";

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
      case locationQuery.search(/\?section=proposal/) === 0: {
        return <CustomDetailForm.Proposal />;
      }
      case locationQuery.search(/\?section=commission/) === 0: {
        return (
          <div className={cx('block_item-out')}>
            {locationQuery}
          </div>
        );
      }
      case locationQuery.search(/\?section=signer/) === 0: {
        return <CustomDetailForm.Signer />;
      }
      case locationQuery.search(/\?section=financial-statements/) === 0: {
        return <CustomDetailForm.FinStatements />;
      }
      case locationQuery.search(/\?section=direction/) === 0: {
        return <CustomDetailForm.Direction />;
      }
      case locationQuery.search(/\?section=account-information/) === 0: {
        return <CustomDetailForm.AccountInfo taskInfo={taskInfo} />;
      }
      case locationQuery.search(/\?section=management-structure/) === 0: {
        return <CustomDetailForm.ManagementStructure />;
      }
      case locationQuery.search(/\?section=physical-person/) === 0: {
        return <CustomDetailForm.PhysicalPerson />;
      }
      default: {
        return <CustomDetailForm.TaskRoot taskInfo={taskInfo} />;
      }
    }
  }

  render() {
    const { isFetching, locationQuery, title, taskInfo, handleSubmit, onCloseDetail } = this.props;

    const { withoutMenu, taskHeader = {}, description = {} } = taskInfo;
    const isPrincipal = TaskCustomDetail.isPrincipal(locationQuery);
    const isReadOnly = TaskCustomDetail.isReadOnly(locationQuery, taskInfo.sections);

    if (isFetching) {
      return (
        <div className={cx('row no-gutters flex-nowrap task-form')}>
          <div className={cx('task-form__wrap block')}>
            <CustomDetailLoader />
          </div>
        </div>
      )
    }

    if (withoutMenu) {
      return (
          <Form className={cx('row no-gutters task-form task-form--without-menu')} onSubmit={handleSubmit(this.handleSubmit)}>
            <CustomDetailForm.CheckDoc
              title={description.title}
              headerNode={(
                <CustomDetailHeader
                  section="Принципал"
                  title={description.text}
                  name={taskHeader.principalDisplayName}
                  inn={taskHeader.principalInn}
                  kpp={taskHeader.principalKpp}
                  ogrn={taskHeader.principalOgrn}
                />
              )}
              submitNode={(
                <div className={cx('task-form__footer')}>
                  <button
                    type="button"
                    className={cx('btn-form btn-form--none')}
                    onClick={onCloseDetail}
                  >
                    Все правильно
                  </button>
                  <button type="submit" className={cx('btn-form btn-form--ok')}>
                    Сохранить изменения
                  </button>
                  <button href="" className="btn-form btn-form--none btn-form--more">
                    <svg width="22" height="22" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                      <path
                        d="M12 3C10.9 3 10 3.9 10 5C10 6.1 10.9 7 12 7C13.1 7 14 6.1 14 5C14 3.9 13.1 3 12 3ZM12 17C10.9 17 10 17.9 10 19C10 20.1 10.9 21 12 21C13.1 21 14 20.1 14 19C14 17.9 13.1 17 12 17ZM12 10C10.9 10 10 10.9 10 12C10 13.1 10.9 14 12 14C13.1 14 14 13.1 14 12C14 10.9 13.1 10 12 10Z"
                        fill="white" />
                    </svg>
                  </button>
                </div>
              )}
            />
          </Form>
      );
    }

    return (
      <div className={cx('row no-gutters flex-nowrap task-form')}>
        <CustomDetailMenu
          title={title}
          sections={taskInfo.sections}
        />
        <Form
          className={cx('task-form__wrap block', {
            'task-form__wrap--readonly': isReadOnly
          })}
          onSubmit={handleSubmit(this.handleSubmit)}
        >
          <CustomDetailHeader
            section={isPrincipal ? 'Принципал' : 'Заявка'}
            title={description.text}
            name={taskHeader.principalDisplayName}
            inn={taskHeader.principalInn}
            kpp={taskHeader.principalKpp}
            ogrn={taskHeader.principalOgrn}
          />
          <div className={cx('block_item-out')}>
            {this.renderFormSection()}
          </div>
          {!isReadOnly && (
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
        </Form>
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
