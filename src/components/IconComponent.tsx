import { Icon, useTheme } from '@ui-kitten/components';
import React from 'react'

interface Props {
    name: string;
    color?: string;
    white?: boolean;
}

export const IconComponent = ({ name, color, white = false }: Props) => {
    const theme = useTheme();

    if ( white) {
        color = theme['color-info-100'];
    } else if (!color) {
        color = theme['text-basic-color'];
    } else {
        color = theme[color] ?? theme['text-basic-color'];
    }

    return (
        <Icon
            name={name}
            fill={color}
            style={{
                width: 25,
                height: 25,
            }}
        />
    )
}
