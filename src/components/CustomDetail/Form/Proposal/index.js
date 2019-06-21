import React from 'react';
import cx from 'classnames';
import {Field} from "redux-form";

import TextField from "../../TextField";
import Dropdown from "../../../Dropdown";
import CheckboxField from "../../CheckboxField";

const Proposal = () => (
  <div className={cx('block_item row align-items-stretch')}>
    <div className={cx('block_head col-12')}>
      Информация о тендере
    </div>

    <div className={cx('col-6 col-md-3')}>
      <Field
        name="placementMethod"
        component={TextField}
        label="Способ размещения"
      />
    </div>
    <div className={cx('col-6 col-md-3')}>
      <Field
        name="registryNumber"
        component={TextField}
        label="Реестровый номер"
      />
    </div>
    <div className={cx('col-6 col-md-3')}>
      <Field
        name="lotNumber"
        component={TextField}
        label="Номер лота"
      />
    </div>
    <div className={cx('col-6 col-md-3')}>
      <Field
        name="dateTender"
        component={TextField}
        label="Дата тендера"
      />
    </div>
    <div className={cx('col-12')}>
      <Field
        name="tenderLink"
        component={TextField}
        label="Ссылка на тендер в интернете"
      />
    </div>

    <div className={cx('col-6 col-md-3')}>
      <Field
        name="procurementItem"
        component={TextField}
        label="Предмет закупки"
      />
    </div>
    <div className={cx('col-6 col-md-3')}>
      <Field
        name="subjectContract"
        component={TextField}
        label="Предмет контракта"
      />
    </div>
    <div className={cx('col-12')} />

    <div className={cx('col-6 col-md-3')}>
      <Field
        name="initialContractPrice"
        component={TextField}
        label="Начальная цена договора"
      />
    </div>
    <div className={cx('col-6 col-md-3')}>
      <Field
        name="contractPriceByClient"
        component={TextField}
        label="Цена контракта предложенная клиентом"
      />
    </div>
    <hr />

    <div className={cx('block_head col-12')}>
      Бенефециар
    </div>

    <div className={cx('col-12')}>
      <Field
        name="nameBeneficiary"
        component={TextField}
        label="Наименование бенефициара"
      />
    </div>
    <div className={cx('col-12')}>
      <Field
        name="legalAddressBeneficiary"
        component={TextField}
        label="Юридический адрес бенефициара"
      />
    </div>
    <div className={cx('col-12')}>
      <Field
        name="actualAddressBeneficiary"
        component={TextField}
        label="Фактический адрес бенефициара"
      />
    </div>
    <div className={cx('col-6 col-md-3')}>
      <Field
        name="innBeneficiary"
        component={TextField}
        label="Бенефициар ИНН"
      />
    </div>
    <hr />

    <div className={cx('block_head col-12')}>
      Информация о контракте
    </div>

    <div className={cx('col-6 col-md-3')}>
      <Field
        name="guaranteeAmount"
        component={TextField}
        label="Сумма гарантии"
      />
    </div>
    <div className={cx('col-6 col-md-3')}>
      <Field
        name="guaranteeSecurity"
        component={TextField}
        label="Обеспечение конкурса/контракта"
      />
    </div>
    <div className={cx('col-12')} />

    <div className={cx('col-6 col-md-3')}>
      <Field
        name="contractNumber"
        component={TextField}
        label="Номер контракта"
      />
    </div>
    <div className={cx('col-6 col-md-3')}>
      <Field
        name="contractDate"
        component={TextField}
        label="Дата контракта"
      />
    </div>
    <div className={cx('col-6 col-md-3')}>
      <Field
        name="contractRegistryNumber"
        component={TextField}
        label="Реестровый номер контракта"
      />
    </div>
    <div className={cx('col-6 col-md-3')}>
      <Field
        name="contractAmount"
        component={TextField}
        label="Сумма контракта"
      />
    </div>
    <div className={cx('col-6 col-md-3')}>
      <Field
        name="postingDate"
        component={TextField}
        label="Дата размещения протокола"
      />
    </div>
    <div className={cx('col-6 col-md-3')}>
      <Field
        name="protocolNumberSummarizing"
        component={TextField}
        label="№ протокола подведения итогов"
      />
    </div>
    <hr />

    <div className={cx('block_head col-12')}>
      Информация о банковской гарантии
    </div>

    <div className={cx('col-6 col-md-3')}>
      <Field
        name="advanceAmount"
        component={TextField}
        label="Сумма аванса"
      />
    </div>
    <div className={cx('col-6 col-md-3')}>
      <label>
        Вид гарантии
      </label>
      <Dropdown
        toggleClassName={cx('task-dropdown')}
        name="typeWarranty"
        list={[
          {
            id: '1',
            name: 'Вид 1'
          },
          {
            id: '2',
            name: 'Вид 2'
          },
          {
            id: '3',
            name: 'Вид 3'
          },
          {
            id: '4',
            name: 'Вид 4'
          },
        ]}
        onSelectItem={(...rest) => console.log(rest)}
      />
    </div>
    <div className={cx('col-6 col-md-3')}>
      <Field
        name="warrantyPeriod"
        component={TextField}
        label="Срок гарантийного периода"
      />
    </div>
    <div className={cx('col-6 col-md-3')}>
      <Field
        name="requiredIssueDate"
        component={TextField}
        label="Требуемая дата выдачи"
      />
    </div>
    <div className={cx('col-6 col-md-3')}>
      <label>
        Вид гарантии
      </label>
      <Dropdown
        toggleClassName={cx('task-dropdown')}
        name="warrantyComesForce"
        list={[
          {
            id: '1',
            name: 'Пункт 1'
          },
          {
            id: '2',
            name: 'Пункт 2'
          },
          {
            id: '3',
            name: 'Пункт 3'
          },
          {
            id: '4',
            name: 'Пункт 4'
          },
        ]}
        onSelectItem={(...rest) => console.log(rest)}
      />
    </div>
    <div className={cx('col-6 col-md-3')}>
      <label>
        Закон / Регламент
      </label>
      <Dropdown
        toggleClassName={cx('task-dropdown')}
        name="Regulation"
        list={[
          {
            id: '1',
            name: 'Пункт 1'
          },
          {
            id: '2',
            name: 'Пункт 2'
          },
          {
            id: '3',
            name: 'Пункт 3'
          },
          {
            id: '4',
            name: 'Пункт 4'
          },
        ]}
        onSelectItem={(...rest) => console.log(rest)}
      />
    </div>
    <div className={cx('col-6 col-md-3')}>
      <Field
        name="warrantyStartDate"
        component={TextField}
        label="Дата начала гарантии"
      />
    </div>
    <div className={cx('col-6 col-md-3')}>
      <Field
        name="warrantyExpirationDate"
        component={TextField}
        label="Дата окончания"
      />
    </div>
    <div className={cx('col-6 col-md-3')}>
      <Field
        name="termDays"
        component={TextField}
        label="Срок БГ, дней"
      />
    </div>
    <div className={cx('col-6 col-md-3 justify-content-center')}>
      <Field
        name="hasWarrantyPeriod"
        component={CheckboxField}
        id="hasWarrantyPeriod"
        type="checkbox"
        label="Гарантийный период"
      />
    </div>
    <div className={cx('col-6 col-md-3 justify-content-center')}>
      <Field
        name="hasPrepaid"
        component={CheckboxField}
        id="hasPrepaid"
        type="checkbox"
        label="Аванс"
      />
    </div>


    <hr />

    <div className={cx('block_head col-12')}>
      Информация об аукционе
    </div>

    <div className={cx('col-6 col-md-3')}>
      <Field
        name="okpdCode"
        component={TextField}
        label="Код по ОКПД"
      />
    </div>
    <div className={cx('col-6 col-md-3')}>
      <label>
        Тип аукциона
      </label>
      <Dropdown
        toggleClassName={cx('task-dropdown')}
        name="auctionType"
        list={[
          {
            id: '1',
            name: 'Признаки 1'
          },
          {
            id: '2',
            name: 'Признаки 2'
          },
          {
            id: '3',
            name: 'Признаки 3'
          },
          {
            id: '4',
            name: 'Признаки 4'
          },
        ]}
        onSelectItem={(...rest) => console.log(rest)}
      />
    </div>
    <div className={cx('col-6 col-md-3')}>
      <Field
        name="identificationCode"
        component={TextField}
        label="Индентификационный код закупки"
      />
    </div>
    <div className={cx('col-12')}>
      <Field
        name="okpdName"
        component={TextField}
        label="Название по ОКПД"
      />
    </div>
    <div className={cx('col-12')}>
      <Field
        name="initialContractPricePercent"
        component={TextField}
        label="% снижения от начальной цены контракта"
      />
    </div>


  </div>
);

export default Proposal;
