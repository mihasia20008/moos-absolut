import React from 'react';
import {Field} from "redux-form";
import cx from 'classnames';

import LoadDoc from '../../LoadDoc';
import FileUpload from '../../FileUpload';
import TextField from '../../TextField';
import CommentField from '../../CommentField';

const TaskRoot = ({taskInfo}) => {
  const {loadDocs = [], comment = {}} = taskInfo;
  return (
    <div className={cx('block_item row align-items-stretch')}>
      <div className={cx('block_head col-12')}>
        Информация о возврате
      </div>
      {loadDocs.map((doc, index) => (
        <div key={index} className={cx('col-6 col-md-6')}>
          <LoadDoc name={doc.name} file={doc.file}/>
        </div>
      ))}
      <hr/>

      <div className={cx('block_head col-12')}>
        Комиссия
      </div>

      <div className={cx('col-12 col-md-4')}>
        <Field
          name="initialCommission"
          component={TextField}
          label="Расчетная комиссия"
          disabled
        />
      </div>
      <div className={cx('col-12 col-md-4')}>
        <Field
          name="actualCommission"
          component={TextField}
          label="Изменить комиссию"
        />
      </div>
      <div className={cx('col-12 col-md-4')}>
        <Field
          name="totalCommission"
          component={TextField}
          label="Итоговая комиссия"
          disabled
        />
      </div>

      <div className={cx('col-12')}>
        <Field
          type="file"
          name="commissionDoc"
          component={FileUpload}
          text="Документ при понижении комиссии"
        />
      </div>

      <Field
        name="comment"
        component={CommentField}
        author={comment.author}
        disabled
      />

    </div>
  );
};

export default TaskRoot;
