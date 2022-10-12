import Sun from 'public/icons/sun.svg';
import Moon from 'public/icons/moon-50.svg';
import CloudSun from 'public/icons/cloud-sun.svg';
import CloudMoon from 'public/icons/cloud-moon.svg';
import CloudSun2 from 'public/icons/cloud-sun-2.svg';
import CloudsSun2 from 'public/icons/clouds-sun-2.svg';
import CloudsMoon from 'public/icons/clouds-moon.svg';
import Cloud from 'public/icons/cloud.svg';
import CloudFog from 'public/icons/cloud-fog-2.svg';
import Fog from 'public/icons/fog.svg';

export const weatherIcons = {
  d000: Sun,
  d100: CloudSun,
  d200: CloudSun2,
  d300: CloudsSun2,
  d400: Cloud,
  d500: CloudFog,
  d600: Fog,

  n000: Moon,
  n100: CloudMoon,
  n200: CloudMoon,
  n300: CloudsMoon,
  n400: Cloud,
  n500: CloudFog,
  n600: Fog,
};

export type WeatherIconType = keyof typeof weatherIcons;
