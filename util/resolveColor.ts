export default function resolveColor (colorName: string, colorList: Record<string, string>): string {
  if (colorName.startsWith('$')){
    const colorName2 = colorList[colorName.slice(1)]
    if(typeof colorName2 !== 'string') return ''
    if(colorName2.startsWith('$') &&colorList[colorName2.slice(1)]) {
      return colorList[colorName2.slice(1)]
    }
    else return colorList[colorName.slice(1)] ?? ''
  }
  else return colorName
}