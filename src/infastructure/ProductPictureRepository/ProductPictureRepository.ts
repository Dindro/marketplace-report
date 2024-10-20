import ProductPicture from '@/entities/ProductPicture';
import type IProductPictureRepository from '@/use-cases/IProductPictureRepository';

export default class ProductPictureRepository implements IProductPictureRepository {
    get(code: number): Promise<ProductPicture> {
        const preview = this.getPreview(code);
        const picture = new ProductPicture(preview);

        return Promise.resolve(picture);
    }

    private getPreview(code: number): string {
        // Функционал позаимствован с wildberries
        const n = parseInt(code.toString(), 10);
        const r = ~~(n / 1e5);
        const o = ~~(n / 1e3);
        const s = this.getHost(r);
        return `https://${s}/vol${r}/part${o}/${n}/images/tm/1.webp`;
    }

    private getHost(e: number): string {
        let t;
        switch (!0) {
        case e >= 0 && e <= 143:
            t = "01";
            break;
        case e <= 287:
            t = "02";
            break;
        case e <= 431:
            t = "03";
            break;
        case e <= 719:
            t = "04";
            break;
        case e <= 1007:
            t = "05";
            break;
        case e <= 1061:
            t = "06";
            break;
        case e <= 1115:
            t = "07";
            break;
        case e <= 1169:
            t = "08";
            break;
        case e <= 1313:
            t = "09";
            break;
        case e <= 1601:
            t = "10";
            break;
        case e <= 1655:
            t = "11";
            break;
        case e <= 1919:
            t = "12";
            break;
        case e <= 2045:
            t = "13";
            break;
        case e <= 2189:
            t = "14";
            break;
        case e <= 2405:
            t = "15";
            break;
        case e <= 2621:
            t = "16";
            break;
        case e <= 2837:
            t = "17";
            break;
        case e <= 3053:
            t = "18";
            break;
        default:
            t = "19"
        }

        return `basket-${t}.wbbasket.ru`;
    }
}