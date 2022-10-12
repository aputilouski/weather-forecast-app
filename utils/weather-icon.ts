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
import CloudDrizzleLightningSun from 'public/icons/cloud-drizzle-lightning-sun.svg';
import CloudDrizzleLightningSun2 from 'public/icons/cloud-drizzle-lightning-sun-2.svg';
import CloudDrizzleLightning from 'public/icons/cloud-drizzle-lightning.svg';
import CloudDrizzleLightningMoon from 'public/icons/cloud-drizzle-lightning-moon.svg';
import CloudDrizzleMoon from 'public/icons/cloud-drizzle-moon.svg';
import CloudDrizzleSun2 from 'public/icons/cloud-drizzle-sun-2.svg';
import CloudDrizzleSun from 'public/icons/cloud-drizzle-sun.svg';
import CloudDrizzle from 'public/icons/cloud-drizzle.svg';
import CloudHailLightningMoon from 'public/icons/cloud-hail-lightning-moon.svg';
import CloudHailLightningSun2 from 'public/icons/cloud-hail-lightning-sun-2.svg';
import CloudHailLightningSun from 'public/icons/cloud-hail-lightning-sun.svg';
import CloudHailLightning from 'public/icons/cloud-hail-lightning.svg';
// import CloudHailMoon from 'public/icons/cloud-hail-moon.svg';
// import CloudHailSun2 from 'public/icons/cloud-hail-sun-2.svg';
// import CloudHailSun from 'public/icons/cloud-hail-sun.svg';
import CloudHail from 'public/icons/cloud-hail.svg';
// import CloudLightningMoon from 'public/icons/cloud-lightning-moon.svg';
// import CloudLightningSun2 from 'public/icons/cloud-lightning-sun-2.svg';
// import CloudLightningSun from 'public/icons/cloud-lightning-sun.svg';
// import CloudLightning from 'public/icons/cloud-lightning.svg';
// import CloudRain2Moon2 from 'public/icons/cloud-rain-2-moon.svg';
// import CloudRain2Sun2 from 'public/icons/cloud-rain-2-sun-2.svg';
// import CloudRain2Sun from 'public/icons/cloud-rain-2-sun.svg';
import CloudRain2 from 'public/icons/cloud-rain-2.svg';
import CloudRainLightningMoon from 'public/icons/cloud-rain-lightning-moon.svg';
import CloudRainLightningSun2 from 'public/icons/cloud-rain-lightning-sun-2.svg';
import CloudRainLightningSun from 'public/icons/cloud-rain-lightning-sun.svg';
import CloudRainLightning from 'public/icons/cloud-rain-lightning.svg';
import CloudRainMoon from 'public/icons/cloud-rain-moon.svg';
import CloudRainSun2 from 'public/icons/cloud-rain-sun-2.svg';
import CloudRainSun from 'public/icons/cloud-rain-sun.svg';
import CloudRain from 'public/icons/cloud-rain.svg';
import CloudSnowMoon from 'public/icons/cloud-snow-moon.svg';
import CloudSnowSun2 from 'public/icons/cloud-snow-sun-2.svg';
import CloudSnowSun from 'public/icons/cloud-snow-sun.svg';
import CloudSnow from 'public/icons/cloud-snow.svg';

export const weatherIcons = {
  d000: Sun,
  d100: CloudSun,
  d200: CloudSun2,
  d210: CloudDrizzleSun,
  d211: CloudDrizzleLightningSun,
  d212: CloudSnowSun2,
  d220: CloudRainSun2,
  d221: CloudHailLightningSun,
  d222: CloudSnowSun2,
  d240: CloudRainLightningSun,
  d300: CloudsSun2,
  d310: CloudDrizzleSun2,
  d312: CloudSnowSun,
  d320: CloudRainSun,
  d322: CloudSnowSun,
  d340: CloudRainLightningSun2,
  d311: CloudDrizzleLightningSun2,
  d321: CloudHailLightningSun2,
  d400: Cloud,
  d410: CloudDrizzle,
  d411: CloudDrizzleLightning,
  d412: CloudSnow,
  d420: CloudRain2,
  d421: CloudHailLightning,
  d422: CloudSnow,
  d430: CloudRain,
  d431: CloudHail,
  d432: CloudSnow,
  d440: CloudRainLightning,
  d500: CloudFog,
  d600: Fog,

  n000: Moon,
  n100: CloudMoon,
  n200: CloudMoon,
  n210: CloudDrizzleMoon,
  n211: CloudDrizzleLightningMoon,
  n212: CloudSnowMoon,
  n220: CloudRainMoon,
  n221: CloudHailLightningMoon,
  n222: CloudSnowMoon,
  n240: CloudRainLightningMoon,
  n300: CloudsMoon,
  n310: CloudDrizzleMoon,
  n312: CloudSnowMoon,
  n320: CloudRainMoon,
  n322: CloudSnowMoon,
  n340: CloudRainLightningMoon,
  n311: CloudDrizzleLightningMoon,
  n321: CloudHailLightningMoon,
  n400: Cloud,
  n410: CloudDrizzle,
  n411: CloudDrizzleLightning,
  n412: CloudSnow,
  n420: CloudRain2,
  n421: CloudHailLightning,
  n422: CloudSnow,
  n430: CloudRain,
  n431: CloudHail,
  n432: CloudSnow,
  n440: CloudRainLightning,
  n500: CloudFog,
  n600: Fog,
};

export type WeatherIconType = keyof typeof weatherIcons;
