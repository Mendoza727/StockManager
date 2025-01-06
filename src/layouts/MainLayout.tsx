import { IconComponent } from '@/components/IconComponent';
import { useNavigation } from '@react-navigation/native';
import { Divider, Layout, TopNavigation, TopNavigationAction } from '@ui-kitten/components';
import React from 'react'
import { PropsWithChildren } from 'react';
import { useSafeAreaInsets } from 'react-native-safe-area-context';

interface props extends PropsWithChildren {
    title: string;
    subtitle?: string;


    rightAction?: () => void;
    rigthActionIcon?: string;
    children?: React.ReactNode
}

export const MainLayout = ({ title, subtitle, rightAction, rigthActionIcon, children }: props) => {

    const { top } = useSafeAreaInsets();
    const { canGoBack, goBack } = useNavigation();

    const renderBackAction = () => (
        <TopNavigationAction
            icon={<IconComponent name="arrow-back-outline" />}
            onPress={goBack}
        />
    );

    const RenderRightAction = () => {

        if (rightAction === undefined || rigthActionIcon === undefined) return null;

        return (
            <TopNavigationAction
                onPress={rightAction}
                icon={<IconComponent name={rigthActionIcon} />}
            />
        )
    }

    return (
        <Layout style={{
            paddingTop: top
        }}>
            <TopNavigation
                title={title}
                subtitle={subtitle}
                alignment='center'
                accessoryLeft={canGoBack() ? renderBackAction : undefined}
                accessoryRight={() => <RenderRightAction /> }
            />
            <Divider />

            <Layout style={{
                height: '100%'
            }}>
                {children}
            </Layout>
        </Layout>
    )
}
