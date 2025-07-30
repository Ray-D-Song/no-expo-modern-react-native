import BottomSheet, { BottomSheetView } from '@gorhom/bottom-sheet'
import { useRef, useImperativeHandle, forwardRef, useState } from 'react'
import { Picker } from '@react-native-picker/picker';
import { View, Text, TouchableOpacity } from 'react-native'
import { useColorScheme } from '~/hooks/useColorScheme'
import { useTranslation } from 'react-i18next';

type Options = {
  label: string
  value: string | number
}[]

interface BottomPickerProps {
  options: Options
  initValue: string | number
  onConfirm: (value: string | number) => void
  snapPoints?: string[]
}

const BottomPicker = forwardRef<BottomSheet, BottomPickerProps>(({
  options,
  initValue,
  onConfirm,
  snapPoints
}: BottomPickerProps, ref) => {
  const { t } = useTranslation()

  const [value, setValue] = useState(initValue)
  const bottomSheetRef = useRef<BottomSheet>(null);
  const { isDarkColorScheme } = useColorScheme();
  useImperativeHandle(ref, () => bottomSheetRef.current!, []);
  
  const handleConfirm = () => {
    onConfirm(value);
    bottomSheetRef.current?.close();
  };
  
  const handleCancel = () => {
    setValue(initValue);
    bottomSheetRef.current?.close();
  };

  return (
    <BottomSheet
      ref={bottomSheetRef}
      index={-1}
      enablePanDownToClose
      handleIndicatorStyle={{
        backgroundColor: isDarkColorScheme ? 'hsl(240, 5%, 64.9%)' : 'hsl(240, 5.9%, 10%)',
      }}
      snapPoints={snapPoints || ['40%']}
      backgroundStyle={{
        backgroundColor: isDarkColorScheme ? 'hsl(240, 3.7%, 15.9%)' : 'hsl(210, 20%, 98.04%)',
      }}
    >
      <BottomSheetView>
        <View style={{ padding: 16 }}>
          <Picker
            selectedValue={value}
            onValueChange={(itemValue, itemIndex) =>
              setValue(itemValue)
            }
            style={{
              color: isDarkColorScheme ? 'hsl(0, 0%, 98%)' : 'hsl(220, 60%, 0.98%)',
              backgroundColor: isDarkColorScheme ? 'hsl(240, 3.7%, 15.9%)' : 'hsl(210, 20%, 98.04%)',
              marginBottom: 16,
            }}
            itemStyle={{
              color: isDarkColorScheme ? 'hsl(0, 0%, 98%)' : 'hsl(220, 60%, 0.98%)',
            }}
          >
            {
              options.map((option) => (
                <Picker.Item key={option.value} label={option.label} value={option.value} />
              ))
            }
          </Picker>
          
          <View style={{ 
            flexDirection: 'row', 
            justifyContent: 'space-between',
            gap: 12,
            paddingBottom: 16 
          }}>
            <TouchableOpacity 
              style={{
                flex: 1,
                backgroundColor: isDarkColorScheme ? 'hsl(240, 3.7%, 25%)' : 'hsl(217.5, 44.44%, 92.94%)',
                paddingVertical: 12,
                paddingHorizontal: 16,
                borderRadius: 8,
                alignItems: 'center',
                borderWidth: 1,
                borderColor: isDarkColorScheme ? 'hsl(240, 3.7%, 30%)' : 'hsl(216, 14.29%, 93.14%)',
              }}
              onPress={handleCancel}
            >
              <Text style={{ 
                color: isDarkColorScheme ? 'hsl(0, 0%, 98%)' : 'hsl(210, 4.92%, 23.92%)',
                fontSize: 16,
                fontWeight: '500'
              }}>
                {t('cancel')}
              </Text>
            </TouchableOpacity>
            
            <TouchableOpacity 
              style={{
                flex: 1,
                backgroundColor: 'hsl(211.06, 100%, 50%)',
                paddingVertical: 12,
                paddingHorizontal: 16,
                borderRadius: 8,
                alignItems: 'center',
              }}
              onPress={handleConfirm}
            >
              <Text style={{ 
                color: 'hsl(0, 0%, 100%)',
                fontSize: 16,
                fontWeight: '500'
              }}>
                {t('confirm')}
              </Text>
            </TouchableOpacity>
          </View>
        </View>
      </BottomSheetView>
    </BottomSheet>
  )
})

export default BottomPicker