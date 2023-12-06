# Page Metrics Element

A custom element to determine page metrics like the small and large
viewport heights. Currently a **work in progress**.

## Defining

You can define it the standard way or use the static `define()` method:

```javascript
import { PageMetricsElement} from "https://esm.sh/gh/knowler/page-metrics-element/page-metrics-element.js?raw";

PageMetricsElement.define();
```

## Usage

Just add the element to the page. It visually doesn’t do anything. It’s
JS API is what is valuable.

```html
<page-metrics></page-metrics>
```

Here’s some ways you can use it.

```js
const pageMetricsElement = document.querySelector("page-metrics");

pageMetrics.smallViewportHeight; // integer
pageMetrics.largeViewportHeight; // integer

pageMetrics.addressBarState; // expanded | resizing | collapsed
```
