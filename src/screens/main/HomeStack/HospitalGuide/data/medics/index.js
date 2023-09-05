import {I18nManager} from 'react-native';
import {colors, HP, images} from '../../../../../../services';

export default [
  {
    html: I18nManager.isRTL
      ? `
<container>
<ul>
<li>
تنص سياسة المستشفى على انه يجب عليك تسليم الادوية التي
تجلبها معك من المنزل الى الممرضة فور دخولك المستشفى 
حفاظا على سلامتك 
</li>
<li>
يتم اعطاؤك الادوية التي احضرتها معك من المنزل تحت اشراف
الممرضة المعنية بك في حالة سماح الطبيب بذلك فيرجى اخبار
الطبيب أو الممرضة بالأدوية التي كنت تتناولها في المنزل ويشمل
ذلك الادوية الطبية او الادوية البديلة من الأعشاب  
</li>
</ul>
<div
style="
margin-top:  ${HP('1.5')};
margin-bottom:  ${HP('1.5')};
width: 100%;
height: ${HP('30')}
"
>
<img 
style="
width: 100%;
height: 100%;
object-fit: fill;
"
src="https://firebasestorage.googleapis.com/v0/b/udhsmart.appspot.com/o/medicinne.jpg?alt=media&token=9cedf1d2-e8b8-4aad-9987-94e148dcf96d" />
</div>
</container>
`
      : `
      <container>
      <ul>
      <li>
      تنص سياسة المستشفى على انه يجب عليك تسليم الادوية التي
      تجلبها معك من المنزل الى الممرضة فور دخولك المستشفى 
      حفاظا على سلامتك 
      </li>
      <li>
      يتم اعطاؤك الادوية التي احضرتها معك من المنزل تحت اشراف
      الممرضة المعنية بك في حالة سماح الطبيب بذلك فيرجى اخبار
      الطبيب أو الممرضة بالأدوية التي كنت تتناولها في المنزل ويشمل
      ذلك الادوية الطبية او الادوية البديلة من الأعشاب  
      </li>
      </ul>
      <div
      style="
      margin-top:  ${HP('1.5')};
      margin-bottom:  ${HP('1.5')};
      width: 100%;
      height: ${HP('30')}
      "
      >
      <img 
      style="
      width: 100%;
      height: 100%;
      object-fit: fill;
      "
      src="https://firebasestorage.googleapis.com/v0/b/udhsmart.appspot.com/o/medicinne.jpg?alt=media&token=9cedf1d2-e8b8-4aad-9987-94e148dcf96d" />
      </div>
      </container>
      `,
  },
];
