import { CheckForApplicationUpdate, Layout, LayoutProps } from 'react-admin';

export const MyLayout = ({ children, ...props }: LayoutProps) => (
    <Layout {...props}>
        {children}
        <CheckForApplicationUpdate />
    </Layout>
);