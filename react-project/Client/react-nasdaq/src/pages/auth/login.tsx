import { Input } from '@/components/ui/input'
import { Button } from '@/components/ui/Button'
import { useForm } from '@tanstack/react-form'
import { createFileRoute } from '@tanstack/react-router'
import { useLoginMutation } from '@/services/auth'

export const Route = createFileRoute('/auth/login')({
    component: RouteComponent,
})

function RouteComponent() {
    const loginMutation = useLoginMutation()
    const form = useForm({
        defaultValues: {
            account: '',
            password: ''
        },
        onSubmit: async ({ value }) => {
            loginMutation.mutate(value);
            // console.log('---val------', value)
        }
    })

    return (
        <form onSubmit={e => {
            e.preventDefault()
            e.stopPropagation()
            form.handleSubmit()
        }}>

            <main className='w-screen h-screen flex justify-center items-center bg-[#2c3e50]'>
                <section className='grid grid-cols-2'>
                    <div className='bg-white rounded-l-sm px-6 py-20 w-[350px] space-y-6'>
                        <h1 className='text-center mb-6'>用户登录</h1>
                        <form.Field name='account' children={field => (
                            <Input value={field.state.value} onChange={e => field.handleChange(e.target.value)} placeholder='请输入账号、邮箱或手机号' />
                        )} />
                        <form.Field name='password' children={field => (
                            <Input value={field.state.value} onChange={e => field.handleChange(e.target.value)} placeholder='请输入登录密码' type='password' />
                        )} />
                        <Button variant='default' className='w-full'>登录</Button>
                    </div>
                    <div style={{
                        backgroundImage: 'url(/images/auth/login.jpg)',
                        backgroundSize: 'cover',
                        backgroundPosition: 'center'
                    }} className='rounded-r-sm'>

                    </div>
                </section>
            </main>
        </form>
    )
}
