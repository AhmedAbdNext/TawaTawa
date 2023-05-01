import { ProductType } from '@/Types/ProductType';
import { atom} from 'recoil';

export const recoilProductsInShoppingCart = atom({
  key: 'shoppingCart',
  default: [] as ProductType[],
});