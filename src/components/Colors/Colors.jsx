import rgbHex from "rgb-hex";
import useCopyToClipboard from 'hooks/useCopyToClipboard';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

/**
 * Injection script, used to replace replacements.keys() found in str with value in replacements[key] value
 * 
 * @param {} str string template string
 * @param {*} replacements Map() key => value, where key is the replacement string and value is the value to replace it with
 * @returns string
 */
const inject = (str, replacements) => str.replace(/\$\[(.*?)\]/g, (x, g) => {
  if (replacements.has(g)) {
    return replacements.get(g);
  }
  return x;
});

/**
 * Template function used to return the template string for 
 * css.
 * 
 * @param {*} length number, how many css properties do we account for. This shoudl map directly to the number of colors we're extracting.
 * @returns 
 */
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
      return `:root {
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

/**
 * Template function used to return the template string for SCSS
 * 
 * @param {*} length number how many scss properties do we account for. This shoudl map directly to the number of colors we're extracting.
 * @returns 
 */
const scss_template = (length) => {
  const template = `$primary:     #$[primary];
$secondary:   #$[secondary];`;
  switch (length) {
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

/**
 * The names of the variables to be exported.
 */
const order = [
  'primary',
  'secondary',
  'tertiary',
  'quaternary',
  'quinary',
]

/**
 * 
 * @param props.colors [] {count} length array of triples [0-255, 0-255, 0-255]
 * @param props.amount [] {count} length array of percentages 0-1
 * @returns 
 */
export default function Colors({
  colors,
  amount
}) {
  // Copy to clipboard hook
  const [value, copy] = useCopyToClipboard();

  /**
   * Function used to template out the string with the colours
   * 
   * @param colors array of colors
   * @param type string 'css', 'scss'
   * @returns 
   */
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


  /**
   * Wrapper function used to copy to clipboard
   * DOes other thigns like toasts the user so they have some feedback
   * 
   * @param {*} valueToCopy 
   * @param {*} str 
   */
  const copyToClip = (valueToCopy, str = null) => {
    copy(valueToCopy);
    toast(`Copied ${str || valueToCopy}`, {
      position: toast.POSITION.BOTTOM_RIGHT
    });
    console.warn(value, 'was copied to the clipboard');
  }

  return (
    <div className="flex flex-col w-full mt-12">
      <ul className='mt-4 flex flex-row w-full cursor-pointer'>
        {colors.map(([r,g,b], k) => <li onClick={() => copyToClip(`#${rgbHex(r, g, b)}`)}
          key={k}
          style={{ backgroundColor: `rgb(${r},${g},${b})` }}
          className={"grow h-28 p-1"}
          title={`Click to copy '#${rgbHex(r, g, b)}' to your clipboard`}
        >
          <div className="text-slate-500 flex justify-between text-xs p-1 mt-[-1.5rem]">
            <div>#{rgbHex(r, g, b)}</div>
            <div className="hidden md:block">{`${r},${g},${b}`}</div>
          </div>
        </li>)}
      </ul>

      <ul className='mt-1 flex flex-row w-full' style={{
        backgroundColor: `rgb(${colors[colors.length - 1][0]},${colors[colors.length - 1][1]},${colors[colors.length - 1][2]})`
      }}>
        {colors.map(([r,g,b], k) => <li
          key={k}
          style={{
            backgroundColor: `rgb(${r},${g},${b})`,
            width: `${Math.round(amount[k] * 100)}%`
          }}
          className={"h-4 p-1"}
          title={`${Math.round(amount[k] * 100)}%`}
        ></li>)}
      </ul>
      <div className="mt-4 flex flex-col md:flex-row w-full">
        <div className="w-full md:w-1/2">
          <span className="text-slate-500 text-xs">CSS</span>
          <div title="Click to copy to clipboard" onClick={() => copyToClip(templateString(colors, 'css'), 'CSS')} className="cursor-pointer flex flex-col bg-slate-800 place-content-center text-blue-400 text-xs min-h-[10rem] p-4 mr-1">
            <code className="whitespace-pre">{templateString(colors, 'css')}</code>
          </div>
        </div>
        <div className="w-full md:w-1/2">
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
