import { Button } from '~/components/ui/button';
import { Sun } from '~/lib/icons/Sun';
import { MoonStar } from '~/lib/icons/MoonStar';
import { useColorScheme } from '~/lib/useColorScheme';

function ToggleTheme() {
  const { isDarkColorScheme, toggleColorScheme } = useColorScheme();
  return (
    <Button onPress={() => {
      toggleColorScheme();
    }}>
      {
        isDarkColorScheme ? (
          <MoonStar />
        ) : (
          <Sun />
        )
      }
    </Button>
  );
}

export default ToggleTheme