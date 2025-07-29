import BottomSheet, { BottomSheetView } from '@gorhom/bottom-sheet'
import { useRef, useImperativeHandle, forwardRef } from 'react'
import { Picker } from '@react-native-picker/picker';
import { Text, View } from 'react-native'

type Options = {
  label: string
  value: string | number
}[]

interface BottomPickerProps {
  options: Options
  selectedValue: string | number
  onValueChange: (value: string | number) => void
}

const BottomPicker = forwardRef<BottomSheet, BottomPickerProps>(({
  options,
  selectedValue,
  onValueChange,
}: BottomPickerProps, ref) => {
  const bottomSheetRef = useRef<BottomSheet>(null);
  useImperativeHandle(ref, () => bottomSheetRef.current!, []);

  return (
    <BottomSheet
      ref={bottomSheetRef}
    >
      <BottomSheetView>
        <View className='bg-background'>
          <Picker
            selectedValue={selectedValue}
            onValueChange={(itemValue, itemIndex) =>
              onValueChange(itemValue)
            }
          >
            {
              options.map((option) => (
                <Picker.Item key={option.value} label={option.label} value={option.value} />
              ))
            }
          </Picker>
        </View>
      </BottomSheetView>
    </BottomSheet>
  )
})

export default BottomPicker