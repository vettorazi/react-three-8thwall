<p align="center">
  <img src="doc-images/logo.png" width="540" />
</p>
<h1 align="center">React Three + 8thWall</h1>
<h3 align="center">Create AR applications on 8th Wall, in the best way possible: Declaratively.😉</h3>

<br>

`React Three + 8thWall` is a collection of examples and boilerplate project that enable developers to use <b>React Three.js and Drei components</b> on your AR project for 8thwall.

#### Quick-start:

🤩 It's simple as simple as...
`git clone <this repo>`
🚀 Then, install and run:
`npm install`
`npm run dev`

---

#### How about SSL Certificates?

8thwall has a weird way of generating SSL, using webpack and a confusing serve.bat file... 🤢
But this project has everything ready and working, out of box! No need to run multiple tasks in the terminal and deal with multiple processes.

When you run `npm run dev` in the terminal, your IP will show up with a ✨https://✨.

##### You might need to create a SSL cert. for mobile:

The easiest way, it's to use mkcert (https://github.com/FiloSottile/mkcert)
Install:
`brew install mkcert`
and run:
`mkcert -key-file key.pem -cert-file cert.pem <Your I.P>`

then airdrop to phone and install it on your device.

---

#### Examples

Here's a couple of examples I used to test the pipeline. But generally all materials, loaders and components used on Drei or React Three will work (you may face issues with some materials that use camera renders)

### Refraction Material

<p align="center">
  <img src="doc-images/refraction.gif" width="240" />
</p>
```js
import DreiRefraction from './examples';
<DreiRefraction/>
```

### Loading GLTF

<p align="center">
  <img src="doc-images/gltf.gif" width="240" />
</p>
```js
import LoadedGltf from './examples';
<LoadedGltf/>
```

### Animation Example

<p align="center">
  <img src="doc-images/animation.gif" width="240" />
</p>
```js
import AnimatedBox from './examples';
<AnimatedBox/>
```

### Wobble Material

<p align="center">
  <img src="doc-images/wooble.gif" width="240" />
</p>
```js
import WobbleMaterial from './examples';
<WobbleMaterial/>
```
### Distorted mesh

<p align="center">
  <img src="doc-images/distorted.gif" width="240" />
</p>
```js
import MeshDistortion from './examples';
<MeshDistortion/>
```
<p align="center">
<br/>
<a href="https://www.buymeacoffee.com/vettorazi" target="_blank"><img src="https://www.buymeacoffee.com/assets/img/custom_images/orange_img.png" alt="Buy Me A Coffee" style="height: 41px !important;width: 174px !important;box-shadow: 0px 3px 2px 0px rgba(190, 190, 190, 0.5) !important;-webkit-box-shadow: 0px 3px 2px 0px rgba(190, 190, 190, 0.5) !important;" ></a>
</p>
