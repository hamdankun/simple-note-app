import React, { memo } from 'react';
import { TextProps, useColorScheme } from 'react-native';
import { Text } from 'react-native';

import styles from './styles';

type DynamicTextProps = {
    children: React.ReactChild,
    style?: {[key:string]:any},
    textProps?: TextProps
}

export default memo(({ children, style = {}, textProps = {} }: DynamicTextProps): JSX.Element => {
    const isDark = useColorScheme() === 'dark';

    const theme: 'dark' | 'normal' = isDark ? 'dark' : 'normal'

    return (
        <Text style={[styles[theme], style]} {...textProps}>
            {children}
        </Text>
    )
})