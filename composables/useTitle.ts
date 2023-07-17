export const useTitle = (str: string) => {
    return `${str}| ${import.meta.env.VITE_SHOP}`;
};
