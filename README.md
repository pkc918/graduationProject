### 招聘后台管理

> 1. 两种权限登录，一种管理员登录，一种用户登录
> 2. 这是一个供用户查询职位得招聘信息，以及更直观感受it岗位得位置分布以及薪资待遇和入职要求

### 技术选型

- React
- Typescript
- axios
- Echarts
- Antd

> 使用函数组件编写，用大量Hook

### Echarts 使用

- 柱状图：用来表示不同的 it 岗位对应的薪资待遇的招聘人数
- 线型图：直观表示了各个岗位的社会需求量
- 饼图：不同学历的需求量
- 南丁格尔图：表示不同岗位之间人数占比

> 使用图表，给人更直观的感受

### 封装一个路由跳转的组件

```tsx
// 此处封装使用 class 组件
import * as React from 'react';
import {Redirect, Route} from 'react-router-dom';

interface propsModel{
  config: any[]
}

export class FrontendAuth extends React.Component<any, propsModel>{
  render() {
    const {location,config} = this.props;
    const {pathname} = location;
    console.log(pathname);
    const isLogin = localStorage.getItem('token');
    const targetRouterConfig = config.find((v:any) => v.path === pathname);

    if (targetRouterConfig && !targetRouterConfig.auth && !isLogin){
      const {component} = targetRouterConfig;
      return <Route exact path={pathname} component={component} />
    }

    if (isLogin) {
      if (pathname === '/login'){
        return <Redirect to='/' />
      }else {
        if (targetRouterConfig) {
          return <Route path={pathname} component={targetRouterConfig.component} />
        }
      }
    }else {
      if (targetRouterConfig && targetRouterConfig.auth){
        return <Redirect to='/login' />
      }
    }
  }
}
```

### 登录

- 管理员登录：采用账号密码和图形验证码的形式
- 用户登录：采用账号密码登录
- 用户注册：账号密码

### 管理员发布职位

- 支持 markdown 的编写和查看，使用 @uiw/react-markdown-editor 插件

```react
import MarkdownEditor from '@uiw/react-markdown-editor';
const [markdown, setMarkdown] = useState("");

<MarkdownEditor
  className="markdown"
  value={markdown}
  onChange={(editor: any, data: any, value: React.SetStateAction<string>) => setMarkdown(value)}
/>
```

### 使用 styled 将 UI 和 逻辑分离

> 使用 styled  和逻辑代码抽离成不同文件，使其文件更简洁
>
> const Div = styled.ul``

### 打包路径配置

> 在 package.json 里的加入 **"homepage": "./"** ，资源请求路径当前目录

### 总结

1. 巩固 React 函数+ts的用法，全程独立完成，不知道就查资料。
2. 心态上的变化：开始有点慌张，问题有点小多，然后自己一一解决之后，心态变好了，越写越顺手。
3. 技术上的巩固：自己尝试优化代码，让自己学习到更多，慢慢让代码写好看，事不过三原则。
4. 对自己的反省：此次项目认识到一些不足还需继续学习，再接再厉。
5. 独立完成的项目，自信爆棚。
