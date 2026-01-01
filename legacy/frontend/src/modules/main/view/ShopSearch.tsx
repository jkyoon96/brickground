import React, { useCallback, useState } from 'react';
import ReactDOM from 'react-dom';
import { Icon, Button, Input, AutoComplete } from 'antd';
import { SOPOONG_URL, ROOT_PATH } from 'common';

export const ShopSearch = (props) => {

  const defaultData = [
                        '리엔몰'
                      ];

  const [dataSource, setDataSource] = useState<string[]>([]);

  const [value, setValue] = useState<string>('');

  const handleSearch = searchText => {

    console.log(defaultData.filter(name => name.includes(searchText)));
    var newDataSource = defaultData.filter(name => name.includes(searchText));

    if(newDataSource == undefined || newDataSource.length == 0) {
      newDataSource = [searchText];
    }

    setDataSource(newDataSource);
    //setDataSournce (!searchText ? [] : [searchText, searchText.repeat(2), searchText.repeat(3)]);
  };

  const handleChange = value => {
    console.log('onChange', value);
    setValue(value);
  };

  const handleSelect = value => {
    console.log('onSelect', value);

    let shopName;

    if(value == '리엔몰')
      shopName = 'lianmall';

    if(shopName != undefined)
      location.href = SOPOONG_URL + '/' + shopName + '/index.html';

  };

  const { Option, OptGroup  } = AutoComplete;

  return (
    <>
    <div style={style}>
      <div style={{ marginLeft: '0px', marginRight: 'auto', marginTop: '10px', width: '100%', maxWidth: '400px' }}>
        <AutoComplete
          dropdownMatchSelectWidth={false}
          dropdownStyle={{ width: 300 }}
          size="large"
          style={{ width: '100%', border: '#076291' }}
          dataSource={dataSource}
          onSelect={handleSelect}
          onSearch={handleSearch}
          onChange={handleChange}

        >
          <Input
            suffix={
              <Button
                style={{ marginRight: '-12px', border: '#076291', backgroundColor: '#076291' }}
                size="large"
              >
                <Icon type="search" style={{ color: '#ffffff' }} />
              </Button>
            }
          />
        </AutoComplete>
      </div>
    </div>
    </>
  );

}

const style = { width: '100%'};
