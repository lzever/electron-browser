# Electron-Browser

![Electron-Browser](build/icons/256x256.png)

## run

项目基于 [electron-vue](https://github.com/SimulatedGREG/electron-vue) 模板开发。

**安装依赖：**

```bat
npm install
```

```bat
.\node_modules\.bin\electron-rebuild.cmd
```

**以dev方式运行：**

```bat
npm run dev
另外再打开一个cmd窗口运行 npm run watch
```

**打包成可执行文件：**

```bat
npm run build
```

打包需要等待几分钟，打包生成可执行文件在项目里的 `build` 文件夹下；

`build/win-unpacked` 文件夹为免安装可执行文件；

`build/electron-browser Setup 0.0.0.exe` 为安装文件。

软件运行配置说明请看 [config.md](config.md)
