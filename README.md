# MICRO PACK

## Description

### 微型打包工具

## Installation

```bash
npm install -g @shewulong/micro-pack
```

## Use in Scripts

### 在`package.json`中添加脚本

```json
{
  "scripts": {
    "micro": "micro-pack --entry src/index.js --output dist"
  }
}
```

### 运行脚本

```bash
npm run micro
```

## Use in typescript

```ts
import { build } '@shewulong/micro-pack';

build({
  entry: 'src/index.ts',
  output: 'dist',
});
```
