import { useRouter } from 'vue-router'

export default function () {
    const router = useRouter()

    const routerGo = (routeName: string) => {
        router.push({ name: routeName })
        router.go(0)
    }

    return {
        routerGo
    }
}