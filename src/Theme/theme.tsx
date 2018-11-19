interface IColorTheme {
  primary: string;
  secondary: string;
  highlight: string;
  text: string;
  border: string;
  link: string;
  textHover: string;
}

export default interface IThemeInterface {
  colors: IColorTheme;
  fontFamily: string;
}
