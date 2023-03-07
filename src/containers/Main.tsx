import Head from "next/head";
import React, {ReactElement, ReactFragment, ReactNode} from "react";
import Header from "~/components/Header";

const MainContainer= (props: {children: ReactFragment | ReactElement | ReactNode}) => {
    return (
        <>
            <Head>
                <title>Code Base</title>
                <meta name="description" content="WriterIo - Safe your code snippets, no more searching in repos to find code example." />
                <link rel="icon" href="/favicon.ico" />
                <link rel="apple-touch-icon" sizes="180x180" href="/apple-touch-icon.png"/>
                <link rel="icon" type="image/png" sizes="32x32" href="/favicon-32x32.png"/>
                <link rel="icon" type="image/png" sizes="16x16" href="/favicon-16x16.png"/>
                <link rel="manifest" href="/site.webmanifest"/>
                <link rel="mask-icon" href="/safari-pinned-tab.svg" color="#5bbad5"/>
                <meta name="msapplication-TileColor" content="#da532c"/>
                <meta name="theme-color" content="#ffffff"/>

                <meta name="google-site-verification" content="rZ5OQUqLUecIR39n1JWIGXbJnhbRzUnrNYGA0zr-7zo" />
            </Head>
            <main>
                <Header/>
                {props.children}
            </main>
        </>
    );
};

export default MainContainer;