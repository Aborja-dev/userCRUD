import 'module-alias/register'
import { App } from '@/server/server';
import pc from 'picocolors'

const runDevApp = async (PORT: number) => {
    const app = await App()
    app.listen(PORT, () => {
        console.log(pc.green('servidor corriendo en el puerto'), PORT)
    })
}

(async () => {
    runDevApp(3000)
})()