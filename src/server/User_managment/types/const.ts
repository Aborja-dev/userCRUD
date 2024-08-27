export const USER_ROLE = {
    MODERADOR: 'MODERADOR',
    VIP: 'VIP',
    SELLER: 'SELLER',
    CLIENT: 'CLIENT',
    ADMIN: 'ADMIN'
} as const;

export type UserRole = typeof USER_ROLE[keyof typeof USER_ROLE]