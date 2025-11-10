import { ConfigProvider, theme } from 'antd';
import { StrictMode } from 'react';
import { Provider } from 'react-redux';

import store from '../store';
import PlayerPanel from './PlayerPanel';
const SkipNoticeWrap = () => {
  return (
    <StrictMode>
      <ConfigProvider theme={{
        // 1. 单独使用暗色算法
        algorithm: theme.darkAlgorithm,
      }}
      >
        <Provider store={store}>
          <PlayerPanel />
        </Provider>
      </ConfigProvider>
    </StrictMode>
  );
};

export default SkipNoticeWrap;