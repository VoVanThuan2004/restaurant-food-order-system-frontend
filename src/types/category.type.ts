

export type CategoryResponse = {
    categoryId: string;
    categoryName: string;
    createdAt: string;
    updatedAt: string;
}

export type CategoryRequest = {
    categoryName: string;
}

export type CategoryUpdate = {
    categoryId: string;
    categoryName: string;
}