import React from 'react';
import { SvgCss } from 'react-native-svg';

const xml = `
<svg xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" version="1.1" x="0px" y="0px" viewBox="0 0 100 125" enable-background="new 0 0 100 100" xml:space="preserve">
    <style>
        .arrow {
            rotation: 180;
        }
    </style>
    <path class="arrow" d="M23.092,44.335l26.586,12.69c0.012,0.006,0.025,0.004,0.037,0.01c0.051,0.021,0.102,0.027,0.152,0.037  c0.045,0.008,0.088,0.02,0.131,0.02c0.047,0,0.092-0.012,0.141-0.02c0.049-0.01,0.1-0.02,0.146-0.037  c0.012-0.006,0.025-0.004,0.039-0.01l26.584-12.69c0.374-0.18,0.532-0.626,0.354-1c-0.129-0.27-0.397-0.428-0.678-0.428  c-0.107,0-0.218,0.023-0.322,0.074L50,55.518L23.738,42.982c-0.105-0.049-0.215-0.072-0.322-0.072c-0.279,0-0.549,0.156-0.678,0.427  C22.561,43.709,22.717,44.156,23.092,44.335z"/>
</svg>
`

const UpArrow = () => <SvgCss xml={xml} width="100%" height="100%" />


export default UpArrow;
