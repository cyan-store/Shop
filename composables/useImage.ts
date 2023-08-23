const assets = import.meta.env.VITE_ASSETS;

export const useImage = (images: string) => {
    const first = images.split(",")[0];

    return first
        ? `${assets}/products/${first}`
        : `${assets}/assets/placeholders/products.jpg`;
};

export const useImages = (images: string) => {
    const imgs = images.split(",");

    return !images
        ? [`${assets}/assets/placeholders/products.jpg`]
        : imgs.map((i) => `${assets}/products/${i}`);
};

export const useAsset = (asset: string) => {
    return `${assets}/assets/site/${asset}`;
};
