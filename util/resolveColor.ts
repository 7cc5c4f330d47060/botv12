export default function resolveColor (colorName: string, colorList: Record<string, string>) {
  if (colorName.startsWith('$')){
    const colorName2 = colorList[colorName.slice(1)]
    if(colorName2.startsWith('$') &&colorList[colorName2.slice(1)]) {
      return colorList[colorName2.slice(1)]
    }
    else return colorList[colorName.slice(1)]
  }
  else return colorName
}