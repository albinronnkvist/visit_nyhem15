import { useRoute, useRouter } from 'vue-router'

export default function () {
    const route = useRoute()
    const router = useRouter()

    const routerPush = (routeName: string) => {
        router.push({ name: routeName })
    }

    const routerPushWithHash = (routeName: string, routeHash: string) => {
        router.push({ name: routeName, hash: routeHash })
    }

    const routerPushWithId = (routeName: string, paramsId: string) => {
        router.push({ name: routeName, params: { itemId: paramsId } })
    }

    const routerGo = (routeName: string) => {
        router.push({ name: routeName })
        router.go(0)
    }

    return {
        route,
        router,
        routerPush,
        routerPushWithHash,
        routerPushWithId,
        routerGo
    }
}