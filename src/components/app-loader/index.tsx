import React, { memo } from 'react';
import { ActivityIndicator } from 'react-native';

import colors from '@theme/colors';

export default memo((): JSX.Element => {
    return (
        <ActivityIndicator size='large' color={colors.red} />
    )
})