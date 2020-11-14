import React, { useEffect } from 'react';
import { Link } from 'react-router-dom';
import { Layout, Menu, Icon } from 'antd';

import { useRootData } from './hooks/useRootData';

import { IAppProps } from './Types/Common';

import { BASE_URL, PATIENTS } from './constants/API';
import { DOCKTOR_MENU } from './constants/Menus';

const { SubMenu } = Menu;
const { Content, Sider } = Layout;

const App: React.FC<IAppProps> = ({ children }): JSX.Element => {
  const { setPatients } = useRootData(({ setPatients }) => ({
    setPatients,
  }));

  useEffect(() => {
    fetch(`${BASE_URL}${PATIENTS}`,{
      headers: {
        doctorId: '1'
      }
    })
      .then(res => res.json())
      .then(result => setPatients(result))
      .catch(err => console.error(err));
  }, [setPatients]);

  return (
    <Content>
      <Layout style={{ background: '#fff', height: '100vh' }}>
        <Sider width={200} style={{ background: '#fff' }}>
          <Menu
            mode="inline"
            theme="dark"
            defaultSelectedKeys={['1']}
            defaultOpenKeys={['sub1']}
            style={{ height: '100%' }}
          >
            {DOCKTOR_MENU.map(
              (item): JSX.Element => {
                if (item.children) {
                  const { children, icon, title } = item;
                  return (
                    <SubMenu
                      key={title}
                      title={
                        <span>
                          <Icon type={icon} />
                          {title}
                        </span>
                      }
                    >
                      {children.map(({ path, title }) => (
                        <Menu.Item key={path}>
                          <Link to={path}>{title}</Link>
                        </Menu.Item>
                      ))}
                    </SubMenu>
                  );
                } else {
                  const { icon, path, title } = item;
                  return (
                    <Menu.Item key={path}>
                      <Link to={path || '/'}>
                        <Icon type={icon} />
                        <span>{title}</span>
                      </Link>
                    </Menu.Item>
                  );
                }
              },
            )}
          </Menu>
        </Sider>
        <Content style={{ padding: '50px 24px', minHeight: 280 }}>{children}</Content>
      </Layout>
    </Content>
  );
};

export default App;
