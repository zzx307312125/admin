import React, { useEffect, useState } from "react";
import { Router } from "react-router-dom";
import history from "@utils/history";
import { IntlProvider } from 'react-intl'
import PubSub from 'pubsub-js'
import { ConfigProvider } from 'antd'
import { zh, en } from './locales'
import Layout from "./layouts";
// 引入重置样式（antd已经重置了一部分了）
import "./assets/css/reset.css";
import enUS from 'antd/es/locale/en_US'
import zhCN from 'antd/es/locale/zh_CN'

function App () {
  const [locale, setLocale] = useState('zh')

  useEffect(() => {
    const token = PubSub.subscribe('LANGUAGE', (messge, data) => {
      setLocale(data)
      return () => {
        PubSub.unsubscribe(token)
      }
    })
  }, [locale])
  const messages = locale === 'zh' ? zh : en
  const antdLocale = locale === 'zh' ? zhCN : enUS
  return (
    <Router history={history}>
      <ConfigProvider locale={antdLocale}>
        <IntlProvider locale={locale} messages={messages}>
          <Layout />
        </IntlProvider>
      </ConfigProvider>
    </Router>
  );
}

export default App;
