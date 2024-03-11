import React from 'react'
import React, { useState } from 'react';
import { View, Text, StatusBar } from 'react-native';

const TurboPartsForm = ({navigation}) => {
  return (
    <View style={{ flex: 1, justifyContent: 'flex-start', alignItems: 'center'}}>
        <View style={{ borderBottomWidth: 1, borderBottomColor: focusedInput === 'picker' ? 'blue' : 'gray', width: '80%', marginBottom: 10, marginTop: 10 }}>
            <Picker
            selectedValue={selectedType}
            onValueChange={(itemValue) => setSelectedType(itemValue)}
            style={{ height: 50, width: '100%', padding: 10 }}
            onFocus={() => setFocusedInput('picker')}
            onBlur={() => setFocusedInput(null)}
            >
            <Picker.Item label="C.U.I.T." value="C.U.I.T." />
            <Picker.Item label="C.N.P.J." value="C.N.P.J." />
            <Picker.Item label="R.F.C." value="R.F.C." />
            <Picker.Item label="R.U.T." value="R.U.T." />
            </Picker>
        </View>
    </View>
  )
}

export default TurboPartsForm