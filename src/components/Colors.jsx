import rgbHex from "rgb-hex";
import useCopyToClipboard from '../hooks/useCopyToClipboard';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const inject = (str, replacements) => str.replace(/\$\[(.*?)\]/g, (x, g) => {
  if (replacements.has(g)) {
    return replacements.get(g);
  }
  return x;
});

const css_template = (length) => {
  const template = `:root {
  --primary:    #$[primary];
  --secondary:  #$[secondary];
}`;
  switch (length) {
    case 3:
      return `:root {
  --primary:    #$[primary];
  --secondary:  #$[secondary];
  --tertiary:   #$[tertiary];
}`;
    case 4:
      return `:root {
  --primary:    #$[primary];
  --secondary:  #$[secondary];
  --tertiary:   #$[tertiary];
  --quaternary: #$[quaternary];
}`;
    case 5:
      return  `:root {
  --primary:    #$[primary];
  --secondary:  #$[secondary];
  --tertiary:   #$[tertiary];
  --quaternary: #$[quaternary];
  --quinary:    #$[quinary];
}`;
    default:
      return template;
  }
}

const scss_template = (length) => {
  const template = `$primary:     #$[primary];
$secondary:   #$[secondary];`;
  switch(length) {
    case 3:
      return template + `
$tertiary:    #$[tertiary];`;
    case 4:
      return template + `
$tertiary:    #$[tertiary];
$quaternary:  #$[quaternary];`;
    case 5:
      return template + `
$tertiary:    #$[tertiary];
$quaternary:  #$[quaternary];
$quinary:     #$[quinary];`;
    default:
      return template;
  }
}

const order = [
  'primary',
  'secondary',
  'tertiary',
  'quaternary',
  'quinary',
]

export default function Colors({
  colors,
  amount
}) {
  const [value, copy] = useCopyToClipboard();
  const templateString = (colors, type) => {
    const replacements = new Map();
    for (const [index, color] of colors.entries()) {
      replacements.set(order[index], rgbHex(color[0], color[1], color[2]));
    }

    switch (type) {
      default:
      case 'css':
        return inject(css_template(colors.length), replacements);
      case 'scss':
        return inject(scss_template(colors.length), replacements);
    }
  }

  const copyToClip = (valueToCopy, str = null) => {
    copy(valueToCopy);
    if (str) {
      toast(`Coppied ${str}`, {
        position: toast.POSITION.BOTTOM_RIGHT
      });
    }
    else {
      toast(`Coppied ${valueToCopy}`, {
        position: toast.POSITION.BOTTOM_RIGHT
      })
    }
    
    console.warn(value, 'was coppied to the clipboard');
  }

  return (
    <div className="flex flex-col w-full mt-12">
      <ul className='mt-4 flex flex-row w-full cursor-pointer'>
        {colors.map((color, k) => <li onClick={() => copyToClip(`#${rgbHex(color[0], color[1], color[2])}`)}
          key={k}
          style={{ backgroundColor: `rgb(${color[0]},${color[1]},${color[2]})` }}
          className={"grow h-28 p-1"}
          title={`Click to copy '#${rgbHex(color[0], color[1], color[2])}' to your clipboard`}
        >
          <div className="text-slate-500 flex justify-between text-xs p-1 mt-[-1.5rem]">
            <div>#{rgbHex(color[0], color[1], color[2])}</div>
            <div>{`${color[0]},${color[1]},${color[2]}`}</div>
          </div>
        </li>)}
      </ul>

      <ul className='mt-1 flex flex-row w-full' style={{
        backgroundColor: `rgb(${colors[colors.length - 1][0]},${colors[colors.length - 1][1]},${colors[colors.length - 1][2]})`
      }}>
        {colors.map((color, k) => <li
          key={k}
          style={{
            backgroundColor: `rgb(${color[0]},${color[1]},${color[2]})`,
            width: `${Math.round(amount[k] * 100)}%`
          }}
          className={"h-4 p-1"}
          title={`${Math.round(amount[k] * 100)}%`}
        ></li>)}
      </ul>
      <div className="mt-4 flex">
          <div className="w-1/2">
            <span className="text-slate-500 text-xs">CSS</span>
            <div title="Click to copy to clipboard" onClick={() => copyToClip(templateString(colors, 'css'), 'CSS')} className="cursor-pointer flex flex-col bg-slate-800 place-content-center text-blue-400 text-xs min-h-[10rem] p-4 mr-1">
              <code className="whitespace-pre">{templateString(colors, 'css')}</code>
            </div>
          </div>
          <div className="w-1/2">
            <span className="text-slate-500 text-xs">SCSS</span>
            <div title="Click to copy to clipboard" onClick={() => copyToClip(templateString(colors, 'scss'), 'SCSS')} className="cursor-pointer flex flex-col place-content-center bg-slate-800 text-blue-400 text-xs min-h-[10rem] p-4">
              <code className=" whitespace-pre">{templateString(colors, 'scss')}</code>
            </div>
          </div>
      </div>
      <ToastContainer />
    </div>
  )
}
