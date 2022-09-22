import React from 'react';
import ReactDOM from 'react-dom';
import 'antd/dist/antd.css';
import './index.css';
import { Tabs } from 'antd';
import { Table, Tag, Space } from 'antd';
import { Checkbox, Button, Cascader, Radio, Tooltip, Modal, Popconfirm, message, Select, Input, Row, Col, InputNumber, Form, Dropdown, Menu, TreeSelect, Tag, Modal } from 'antd';
import {
  EditTwoTone,
  UserOutlined,
  DownOutlined,
  DeleteTwoTone,
  SnippetsTwoTone,
  PlusCircleTwoTone,
  FileExcelOutlined,
  DownloadOutlined,
  QuestionCircleTwoTone,
  ExclamationCircleOutlined,
  HistoryOutlined,
  SettingOutlined,
  HeatMapOutlined,
  WarningOutlined,
  CarryOutOutlined,
  ToolOutlined,
  IssuesCloseOutlined,
  DragOutlined
} from '@ant-design/icons';
import { sortableContainer, sortableElement, sortableHandle } from 'react-sortable-hoc';
import { MenuOutlined } from '@ant-design/icons';
import arrayMove from 'array-move';

const { TabPane } = Tabs;

const { Column, ColumnGroup } = Table;

const columnsMenu = [
  {
    title: <DragOutlined />,
    dataIndex: 'sort',
    width: 57,
    className: 'drag-visible',
    render: () => <DragHandle />,
  },
  {
    title: 'Кололнки',
    dataIndex: 'name',
    //width: 80,
    className: 'drag-visible',
  },
 //{
   // title: 'Action',
    //dataIndex: 'Action',
  //},

];

const dataMenu = [
  {
    key: '1',
    name: <Checkbox defaultChecked disabled>Тип</Checkbox>,
    index: 0,
  },
  {
    key: '2',
    name: <Checkbox defaultChecked disabled>Дата возникновения</Checkbox>,
    index: 1,
  },
  {
    key: '3',
    name: <Checkbox onChange={onChange}>Точка учёта</Checkbox>,
    index: 2,
  },
  {
    key: '4',
    name: <Checkbox onChange={onChange}>Адрес</Checkbox>,
    index: 3,
  },
  {
    key: '5',
    name: <Checkbox onChange={onChange}>Тип устройства</Checkbox>,
    index: 4,
  },
  {
    key: '6',
    name: <Checkbox onChange={onChange}>Устройство</Checkbox>,
    index: 5,
  },
  {
    key: '7',
    name: <Checkbox onChange={onChange}>Заводской номер</Checkbox>,
    index: 6,
  },
  {
    key: '8',
    name: <Checkbox onChange={onChange}>Код события</Checkbox>,
    index: 7,
  },
  {
    key: '9',
    name: <Checkbox onChange={onChange}>Источник</Checkbox>,
    index: 8,
  },
  {
    key: '10',
    name: <Checkbox onChange={onChange}>Описание</Checkbox>,
    index: 9,
  },
  {
    key: '11',
    name: <Checkbox onChange={onChange}>Условие</Checkbox>,
    index: 10,
  },
  {
    key: '12',
    name: <Checkbox onChange={onChange}>Статус</Checkbox>,
    index: 11,
  },
  {
    key: '13',
    name: <Checkbox onChange={onChange}>Исполнитель</Checkbox>,
    index: 12,
  },
  {
    key: '14',
    name: <Checkbox onChange={onChange}>Действие</Checkbox>,
    index: 13,
  },
  {
    key: '15',
    name: <Checkbox onChange={onChange}>Причина</Checkbox>,
    index: 14,
  },
  {
    key: '16',
    name: <Checkbox onChange={onChange}>Превышение нормы</Checkbox>,
    index: 15,
  },
  {
    key: '17',
    name: <Checkbox onChange={onChange}>Дата закрытия</Checkbox>,
    index: 16,
  },
  {
    key: '18',
    name: <Checkbox onChange={onChange}>Изменение</Checkbox>,
    index: 17,
  },
  {
    key: '19',
    name: <Checkbox onChange={onChange}>Повторение</Checkbox>,
    index: 18,
  },
];

const rowSelection = {
  onChange: (selectedRowKeys, selectedRows) => {
    console.log(`selectedRowKeys: ${selectedRowKeys}`, 'selectedRows: ', selectedRows);
  },
  getCheckboxProps: (record) => ({
    disabled: record.key == 2,
    // Column configuration not to be checked
    key: record.key,
  }),
   
};

const SortableItem = sortableElement(props => <tr {...props} />);
const SortableContainer = sortableContainer(props => <tbody {...props} />);

//Наполнение модального окна настройки пунктов меню
const DragHandle = sortableHandle(() => (
  <MenuOutlined style={{ cursor: 'pointer', color: '#999' }} />
));

//класс сортируемой таблицы с пунктами меню
class SortableTable extends React.Component {
  state = {
    dataSource: dataMenu,
  };

  onSortEnd = ({ oldIndex, newIndex }) => {
    const { dataSource } = this.state;
    if (oldIndex !== newIndex) {
      const newData = arrayMove([].concat(dataSource), oldIndex, newIndex).filter(el => !!el);
      console.log('Sorted items: ', newData);
      this.setState({ dataSource: newData });
    }
  };

  DraggableContainer = props => (
    <SortableContainer
      useDragHandle
      disableAutoscroll
      helperClass="row-dragging"
      onSortEnd={this.onSortEnd}
      {...props}
    />
  );

  DraggableBodyRow = ({ className, style, ...restProps }) => {
    const { dataSource } = this.state;
    // function findIndex base on Table rowKey props and should always be a right array index
    const index = dataSource.findIndex(x => x.index === restProps['data-row-key']);
    return <SortableItem index={index} {...restProps} />;
  };

  render() {
    const { dataSource } = this.state;

    return (
      <Table
              
        dataSource={dataSource}
        columns={columnsMenu}
        rowKey="index"
        components={{
          body: {
            wrapper: this.DraggableContainer,
            row: this.DraggableBodyRow,
          },
        }}
         rowSelection={{
          type: Checkbox,
          ...rowSelection,
        }}
        scroll={{ y: 240 }}
      />
    );
  }
}

//Модальное окно настройки пунктов меню
class LocalizedModalMenuSet extends React.Component {
  state = { visible: false };

  showModal = () => {
    this.setState({
      visible: true,
    });
  };

  hideModal = () => {
    this.setState({
      visible: false,
    });
  };

  //Наполнение окна редактирования отображения пунктов меню
  render() {
    return (
      <>
        
        <SettingOutlined style={{ fontSize: '20px', color:"#0c569b"}} onClick={this.showModal} />

        <Modal
          title="Настройка отображения колонок"
          visible={this.state.visible}
          onOk={this.hideModal}
          onCancel={this.hideModal}
          okText="Применить"
          cancelText="Отмена"
        >
        <SortableTable />     
            
        </Modal>
      </>
    );
  }
}

const treeData1 = [
  {
    title: 'Группы',
    key: '0-0',
    value: '0-0',
    children: [
      {
        title: 'Договор',
        key: '0-0-0',
        value: '0-0-0',
        children: [
          {
            title: 'ЖК_Гарден Парк',
            key: '0-0-0-0',
            value: '0-0-0-0',
          },
          {
            title: 'ЖК_Легенда',
            key: '0-0-0-1',
            value: '0-0-0-1',
          },
          {
            title: 'ЖК_Эдальго',
            key: '0-0-0-2',
            value: '0-0-0-2',
          },
        ],
      },
      {
        title: 'Электрогорск',
        key: '0-0-1',
        value: '0-0-1',
        children: [
          {
            title: 'ЦДО "Истоки"',
            key: '0-0-1-0',
            value: '0-0-1-0',
          },
          {
            title: 'ЦДО"Истоки"',
            key: '0-0-1-1',
            value: '0-0-1-1',
          },
        ],
      },
      {
      title: 'ЛК МОЭК',
      key: '0-0-2',
      value: '0-0-2',
      children: [
        {
          title: '0150/004',
          key: '0-0-2-0',
          value: '0-0-2-0',
        },
        {
          title: '0303/047',
          key: '0-0-2-1',
          value: '0-0-2-1',
        },
        {
          title: 'ЦСКА',
          key: '0-0-2-3',
          value: '0-0-2-3',
        },
      ],
      },
      {
        title: '0003/004',
        key: '0-0-3',
        value: '0-0-3',
      },
    ],
  },
];

//Выбор групп
class Groups extends React.Component {
  state = {
     value: ['0-0'],
  };

  onChange = value => {
    console.log(value);
    this.setState({ value });
  };

  render() {
    return (
      <Tooltip placement="top" title={'Группы'}>
        <TreeSelect
          //multiple
          style={{ width: '100' }}
          value={this.state.value}
          dropdownStyle={{ maxHeight: 400, overflow: 'auto' }}
          treeData={treeData1}
          placeholder="Выберите группу"
          //treeDefaultExpandAll
          onChange={this.onChange}
          treeCheckable
          maxTagCount={1}
          size="small"
        
        />
      </Tooltip>
    );
  }
}

const menu = (
  <Menu>
    <Menu.Item>
      <a target="_blank" rel="noopener noreferrer" href="http://www.taobao.com/">
        Настройки
      </a>
    </Menu.Item>
    <Menu.Item>
      <a target="_blank" rel="noopener noreferrer" href="http://www.tmall.com/">
        Выход
      </a>
    </Menu.Item>
  </Menu>
);

const columns1 = [

  // {
  //   title: 'Тип',
  //   dataIndex: 'type', 
  //   key: 'type',
  //   render: type => (
  //     <span>
  //       {type.map(tag => {
  //         let color = tag.length > 5 ? 'geekblue' : 'green';
  //         if (tag === 'loser') {
  //           color = 'volcano';
  //         }
  //         return (
  //           <Tag color={color} key={tag}>
  //             {tag.toUpperCase()}
  //           </Tag>
  //         );
  //       })}
  //     </span>
  //   ),
  // },
  // {
  //   title: 'Тип',
  //   key: 'tags',
  //   dataIndex: 'tags',
  //   render: tags => (
  //     <span>
  //       {tags.map(tag => {
  //         let color = tag.length > 5 ? 'geekblue' : 'green';
  //         if (tag === 'Авария') {
  //           color = 'volcano';
  //         }
  //         if (tag === 'Поверка') {
  //           color = 'green';
  //         }
  //         if (tag === 'Предупреждение') {
  //           color = 'orange';
  //         }
  //         if (tag === 'ТО') {
  //           color = 'yellow';
  //         }
  //         return (
  //           <Tag color={color} key={tag}>
  //             {tag.toUpperCase()}
  //           </Tag>
  //         );
  //       })}
  //     </span>
  //   ),
  // },
  {
    title: "Тип",
    dataIndex: "type_icon",
    key: "type_icon"
  },
  {
    title: "Дата возникновения",
    dataIndex: "data",
    key: "data"
  },
  {
    title:"Точка учёта",
    dataIndex:"object",
    key:"object"
  },
  {
    title:"Адрес",
    dataIndex:"Address",
    key:"Address"
  },
  {
    title: "Тип устройства",
    dataIndex: "device_type",
    key:"device_type"
  },
  {
    title: "Устройство",
    dataIndex: "device",
    key: "device" 
  },
  {
    title:"Заводской номер",
    key:"serial_number",
    dataIndex:"serial_number"
  },
  {
    title: "Код события",
    dataIndex: "code",
    key: "code"
  },
  {
    title:"Источник",
    dataIndex:"source",
    key:"source"
  },
  {
    title:"Описание",
    dataIndex:"description",
    key:"description"
  },
  {
    title:"Условие",
    dataIndex:"condition",
    key:"condition"
  },
  {
    title:"Статус",
    dataIndex:"status",
    key:"status",
    render: () => (
      <Space size="middle">
        <Select defaultValue="new" style={{ width: 100 }} size="small" >
          <Option value="new">Новое</Option>

        </Select>
      </Space>
    ),
  },
  {
    title:"Исполнитель",
    dataIndex:"contractor",
    key:"contractor"
  },
  {
    title:"Действие",
    dataIndex:"action",
    key:"action"
  },
  {
    title:"Причина",
    dataIndex:"reason",
    key:"reason"
  },
  {
    title:"Превышение нормы",
    dataIndex:"norm",
    key:"norm"
  },
  {
    title:"Дата закрытия",
    dataIndex:"data_close",
    key:"data_close"
  },
  {
    title:"Изменение",
    dataIndex:"change",
    key:"change",
    render: () => (
      <Space size="middle">
        <a>Изменить</a>
      </Space>
    ),
  },
  {
    title:"Повторение",
    dataIndex:"repeat",
    key:"repeat"
  },
  {
    title:<LocalizedModalMenuSet />,
    dataIndex:"settings",
    key:"settings"
  }

  
]

const datasource1 = [
  {
    tags:['Авария'],
    type_icon: <Tooltip placement="right" title={'Авария'}><HeatMapOutlined style={{ fontSize: '20px', color:"red"}}/></Tooltip>,
    data:"18.06.2021 22:00:00",
    object:"ДОМ №11 ТЭ",
    Address:"ул. Ленина, д. 11",
    device_type:"Магика",
    device:"Теплосчетчик",
    serial_number:"EA505005",
    code:"",
    source:"ПА",
    description:"t1-t2= 2,4 *C",
    condition:"Температурный контроль",
    contractor: "",
    action: "",
    reason: "",
    norm: "",
    data_close: "",
    change: "",
    repeat: "",
  },
  {
    type_icon:<Tooltip placement="right" title={'Предупреджение'}><WarningOutlined style={{ fontSize: '20px', color:"orange"}}/></Tooltip>,
    tags:['Предупреждение'],
    data:"18.06.2021 22:00:00",
    object:"ДОМ №11 ТЭ",
    Address:"ул. Ленина, д. 11",
    device_type:"Магика",
    device:"Теплосчетчик",
    serial_number:"EA505005",
    code:"",
    source:"ПА",
    description:"t1-t2= 2,4 *C",
    condition:"Температурный контроль",
    contractor: "",
    action: "",
    reason: "",
    norm: "",
    data_close: "",
    change: "",
    repeat: "",
  },
  {
    type_icon: <Tooltip placement="right" title={'Незавершённое'}><IssuesCloseOutlined style={{ fontSize: '20px', color:"blue"}}/></Tooltip>,
    tags:['Незавершённое'],
    data:"18.06.2021 22:00:00",
    object:"ДОМ №11 ТЭ",
    Address:"ул. Ленина, д. 11",
    device_type:"Магика",
    device:"Теплосчетчик",
    serial_number:"EA505005",
    code:"",
    source:"ПА",
    description:"t1-t2= 2,4 *C",
    condition:"Температурный контроль",
    contractor: "",
    action: "",
    reason: "",
    norm: "",
    data_close: "",
    change: "",
    repeat: "",
  },
  {
    type_icon: <Tooltip placement="right" title={'Поверка'}><CarryOutOutlined style={{ fontSize: '20px', color:"green"}}/></Tooltip>,
    tags:['Поверка'],
    data:"18.06.2021 22:00:00",
    object:"ДОМ №11 ТЭ",
    Address:"ул. Ленина, д. 11",
    device_type:"Магика",
    device:"Теплосчетчик",
    serial_number:"EA505005",
    code:"",
    source:"ПА",
    description:"t1-t2= 2,4 *C",
    condition:"Температурный контроль",
    contractor: "",
    action: "",
    reason: "",
    norm: "",
    data_close: "",
    change: "",
    repeat: "",
  },
  {
    tags:['ТО'],
    type_icon: <Tooltip placement="right" title={'Техническое обслуживание'}><ToolOutlined style={{ fontSize: '20px', color:"purple"}}/></Tooltip>,
    data:"18.06.2021 22:00:00",
    object:"ДОМ №11 ТЭ",
    Address:"ул. Ленина, д. 11",
    device_type:"Магика",
    device:"Теплосчетчик",
    serial_number:"EA505005",
    code:"",
    source:"ПА",
    description:"t1-t2= 2,4 *C",
    condition:"Температурный контроль",
    contractor: "",
    action: "",
    reason: "",
    norm: "",
    data_close: "",
    change: "",
    repeat: "",
  },

  
]

function callback(key) {
  console.log(key);
}

function onChange(e) {
  console.log(`checked = ${e.target.checked}`);
}

function onChange(value) {
  console.log(value);
}

const { confirm } = Modal;

function confirmPopConf() {
  message.info('Запись удалена');
}

function showConfirm() {
  confirm({
    title: 'Подтверждение',
    icon: <ExclamationCircleOutlined />,
    content: 'Вы действительно хотите удалить данное оповещение?',
    onOk() {
      console.log('Да');
    },
    onCancel() {
      console.log('Отмена');
    },
  });
}

//наполнение окна 'добавить оповещение'
//для чекбоксов
function onChangeChkBox(checkedValues) {
  console.log('checked = ', checkedValues);
}

//для инпутнамбера
function onChangeInpNum(value) {
  console.log('changed', value);
}

//для селекта 
const { Option } = Select;
function handleChange(value) {
  console.log(`selected ${value}`);
}


//форма изменения пароля
const layout = {
  labelCol: {
    span: 8,
  },
  wrapperCol: {
    span: 16,
  },
};
const tailLayout = {
  wrapperCol: {
    offset: 8,
    span: 16,
  },
};

const Demo = () => {
  const onFinish = (values) => {
    console.log('Успешно:', values);
  };

  const onFinishFailed = (errorInfo) => {
    console.log('Ошибка:', errorInfo);
  };

  return (
    <Form
      {...layout}
      name="basic"
      initialValues={{
        remember: true,
      }}
      onFinish={onFinish}
      onFinishFailed={onFinishFailed}
    >
      <Form.Item
        label="Старый пароль"
        name="old_psw"
        rules={[
          {
            required: true,
            message: 'Пожалуйста, введите старый пароль',
          },
        ]}
      >
        <Input.Password />
      </Form.Item>

      <Form.Item
        label="Новый пароль"
        name="new_psw"
        rules={[
          {
            required: true,
            message: 'Пожалуйста, введите новый пароль',
          },
        ]}
      >
        <Input.Password />
      </Form.Item>

       <Form.Item
        label="Повторите пароль"
        name="new_psw1"
        rules={[
          {
            required: true,
            message: 'Пожалуйста, повторите новый пароль',
          },
        ]}
      >
        <Input.Password />
      </Form.Item>

      <Form.Item {...tailLayout} name="remember" valuePropName="checked">
        <Checkbox>Запомнить меня</Checkbox>
      </Form.Item>

      <Form.Item {...tailLayout}>
        <Button type="primary" htmlType="submit">
          Изменить
        </Button>
      </Form.Item>
    </Form>
  );
};

//Модальное окно редактирования пароля

class LocalizedModalPsw extends React.Component {
  state = { visible: false };

  showModal = () => {
    this.setState({
      visible: true,
    });
  };

  hideModal = () => {
    this.setState({
      visible: false,
    });
  };

  render() {
    return (
      <>
        <Button type="primary" onClick={this.showModal}>
          Изменить
        </Button>
        <Modal
          title="Смена старого пароля"
          visible={this.state.visible}
          onOk={this.hideModal}
          onCancel={this.hideModal}
          okText="Изменить"
          cancelText="Отмена"
        >
          <Demo />
        </Modal>
      </>
    );
  }
}

ReactDOM.render(
  <>
  <Space direction="vertical">
    <Space size='large'>
      <Checkbox>Авария</Checkbox>
      <Checkbox>Предупреждение</Checkbox>
      <Checkbox>Сообщение</Checkbox>
      <Checkbox>НС</Checkbox>
      <Checkbox>Поверка</Checkbox>
      <Checkbox>ТО</Checkbox>
      <Groups />
      <Button type="primary" shape="round" color="#1E6738"
          style={{
          //   color: 'white',
           backgroundColor: '#0c569b',
           underlayColor:'#0c569b',
          }}
          icon={<HistoryOutlined style={{
        color: 'white',
        backgroundColor: '#0c569b'}} />}>
          Провести анализ
          </Button>
      <Dropdown overlay={menu} trigger={['click']}>
            <a className="ant-dropdown-link" onClick={e => e.preventDefault()}>
            <Tooltip title={<a href="">Пользователь: БИАТ</a>}>
            <UserOutlined />БИАТ
          </Tooltip><DownOutlined />
            </a>
      </Dropdown>
    </Space>
    <Tabs onChange={callback} type="card">
      <TabPane tab="Аварийные и нештатные ситуации" key="2">
      <Table
          columns={columns1}
          dataSource={datasource1}
        />
    
        {/* <LocalizedModalAlert /> */}
    
        {/* Ранее здесь была кнопка добавления новой рассылки
        <LocalizedModalReport /> */}

      </TabPane>

      <TabPane tab="Поверка" key="1">
        {/* <Table dataSource={data}>
          <Column 
            title=""
            key="info"
            dataIndex="info"
            //render={(text) => (
              //<Space size="middle">
                //<a>{text}</a>
              //</Space>
            //)}
          />
            
          <Column title="Настройка отображения на сайте" dataIndex="discr" key="discr" />
          <Column title="" dataIndex="action" key="action" />
            render={(text, record) => (
              <Space size="middle">
              <Checkbox onChange={onChange}></Checkbox>
              </Space>
          )}
        </Table> */}
      </TabPane>
      
      <TabPane tab="Техническое обслуживание" key="3">
        {/* <Table dataSource={data0}>
          <Column title="" key="info" dataIndex="info" />
          <Column title="Общие настройки" dataIndex="discr" key="discr" />
          <Column
            title=""
            key="action"
            render={(text, record) => (
              <Space size="middle">
                <LocalizedModalPsw />
              </Space>
            )}
          />
        </Table> */}
      </TabPane>
      <TabPane tab="Оперативный журнал" key="4">
        {/* <Table dataSource={data0}>
          <Column title="" key="info" dataIndex="info" />
          <Column title="Общие настройки" dataIndex="discr" key="discr" />
          <Column
            title=""
            key="action"
            render={(text, record) => (
              <Space size="middle">
                <LocalizedModalPsw />
              </Space>
            )}
          />
        </Table> */}
      </TabPane>
    </Tabs>
  </Space> 
 </>,
  document.getElementById('container')
);