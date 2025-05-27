# Android
安卓部分的代码位于 `android` 目录下，由以下几个部分组成。  
跨平台开发容易出问题，更难以 Debug，其中一个重要原因就是对于各平台的配置不了解。  
比如 Android 使用 Gradle 来管理依赖和构建应用，这玩意严重违背了 less is more 的原则，臃肿无比。  

## Gradle 脚本解析
在 `android` 和 `android/app` 目录下各有一个 `build.gradle` 文件，前者是项目级别的，后者是应用级别的。  

项目级别的配置主要用于定义全局变量、版本号、公共依赖等。
```groovy
buildscript {
    ext {
        // 构建工具版本
        buildToolsVersion = "35.0.0"
        // 最小 SDK 版本
        minSdkVersion = 24
        // 编译 SDK 版本
        compileSdkVersion = 35
        // 目标 SDK 版本
        targetSdkVersion = 35
        // NDK 版本
        ndkVersion = "27.1.12297006"
        // Kotlin 版本
        kotlinVersion = "2.0.21"
    }
    // 仓库
    repositories {
        google()
        mavenCentral()
    }
    // 依赖
    dependencies {
        classpath("com.android.tools.build:gradle")
        classpath("com.facebook.react:react-native-gradle-plugin")
        classpath("org.jetbrains.kotlin:kotlin-gradle-plugin")
    }
}

apply plugin: "com.facebook.react.rootproject"
```

应用级别的配置主要用于定义应用特定的设置。
```groovy
apply plugin: "com.android.application"
apply plugin: "org.jetbrains.kotlin.android"
apply plugin: "com.facebook.react"

/**
 * 这是用于自定义 React Native Android 应用的配置块。
 * 默认情况下不需要应用任何配置，只需取消注释需要的内容。
 */
react {
    /* Folders */
    //   The root of your project, i.e. where "package.json" lives. Default is '../..'
    // root = file("../../")
    //   The folder where the react-native NPM package is. Default is ../../node_modules/react-native
    // reactNativeDir = file("../../node_modules/react-native")
    //   The folder where the react-native Codegen package is. Default is ../../node_modules/@react-native/codegen
    // codegenDir = file("../../node_modules/@react-native/codegen")
    //   The cli.js file which is the React Native CLI entrypoint. Default is ../../node_modules/react-native/cli.js
    // cliFile = file("../../node_modules/react-native/cli.js")

    /* Variants */
    //   The list of variants to that are debuggable. For those we're going to
    //   skip the bundling of the JS bundle and the assets. By default is just 'debug'.
    //   If you add flavors like lite, prod, etc. you'll have to list your debuggableVariants.
    // debuggableVariants = ["liteDebug", "prodDebug"]

    /* Bundling */
    //   A list containing the node command and its flags. Default is just 'node'.
    // nodeExecutableAndArgs = ["node"]
    //
    //   The command to run when bundling. By default is 'bundle'
    // bundleCommand = "ram-bundle"
    //
    //   The path to the CLI configuration file. Default is empty.
    // bundleConfig = file(../rn-cli.config.js)
    //
    //   The name of the generated asset file containing your JS bundle
    // bundleAssetName = "MyApplication.android.bundle"
    //
    //   The entry file for bundle generation. Default is 'index.android.js' or 'index.js'
    // entryFile = file("../js/MyApplication.android.js")
    //
    //   A list of extra flags to pass to the 'bundle' commands.
    //   See https://github.com/react-native-community/cli/blob/main/docs/commands.md#bundle
    // extraPackagerArgs = []

    /* Hermes Commands */
    //   The hermes compiler command to run. By default it is 'hermesc'
    // hermesCommand = "$rootDir/my-custom-hermesc/bin/hermesc"
    //
    //   The list of flags to pass to the Hermes compiler. By default is "-O", "-output-source-map"
    // hermesFlags = ["-O", "-output-source-map"]

    /* Autolinking */
    autolinkLibrariesWithApp()
}

/**
 * Set this to true to Run Proguard on Release builds to minify the Java bytecode.
 */
def enableProguardInReleaseBuilds = false

/**
 * The preferred build flavor of JavaScriptCore (JSC)
 *
 * For example, to use the international variant, you can use:
 * `def jscFlavor = io.github.react-native-community:jsc-android-intl:2026004.+`
 *
 * The international variant includes ICU i18n library and necessary data
 * allowing to use e.g. `Date.toLocaleString` and `String.localeCompare` that
 * give correct results when using with locales other than en-US. Note that
 * this variant is about 6MiB larger per architecture than default.
 */
def jscFlavor = 'io.github.react-native-community:jsc-android:2026004.+'

android {
    ndkVersion rootProject.ext.ndkVersion
    buildToolsVersion rootProject.ext.buildToolsVersion
    compileSdk rootProject.ext.compileSdkVersion

    namespace "com.rntemplate"
    defaultConfig {
        applicationId "com.rntemplate"
        minSdkVersion rootProject.ext.minSdkVersion
        targetSdkVersion rootProject.ext.targetSdkVersion
        versionCode 1
        versionName "1.0"
    }
    signingConfigs {
        debug {
            storeFile file('debug.keystore')
            storePassword 'android'
            keyAlias 'androiddebugkey'
            keyPassword 'android'
        }
    }
    buildTypes {
        debug {
            signingConfig signingConfigs.debug
        }
        release {
            // Caution! In production, you need to generate your own keystore file.
            // see https://reactnative.dev/docs/signed-apk-android.
            signingConfig signingConfigs.debug
            minifyEnabled enableProguardInReleaseBuilds
            proguardFiles getDefaultProguardFile("proguard-android.txt"), "proguard-rules.pro"
        }
    }
}

dependencies {
    // The version of react-native is set by the React Native Gradle Plugin
    implementation("com.facebook.react:react-android")

    if (hermesEnabled.toBoolean()) {
        implementation("com.facebook.react:hermes-android")
    } else {
        implementation jscFlavor
    }
}
```

## 自动链接
当你在项目中安装一个包含原生代码的 React Native 包时，React Native CLI 会自动检测这个包的原生配置，并修改你的安卓项目（android/ 目录）以正确地链接和编译这些原生模块。

这个过程可以分解为以下几个步骤：
1. 包配置文件的约定 (react-native.config.js)：
每个支持自动链接的 React Native 包在其根目录下都应该有一个 react-native.config.js 文件。
这个文件定义了包的原生部分如何被链接和配置。
如果一个包没有这个文件，或者文件内容不正确，自动链接就可能失效。

2. CLI 的扫描与发现：
当你运行 npx react-native run-android 或其他 CLI 命令（如 npx react-native link，@react-native-community/cli 会扫描你的 node_modules 目录，遍历所有安装的 react-native-* 或其他已知包含原生代码的包，查找它们各自的 react-native.config.js 文件，收集所有这些包的安卓链接配置信息。

3. Gradle 文件修改与生成：
这是自动链接的核心。CLI 会根据收集到的信息，自动修改或生成以下文件：
- android/settings.gradle: 这个文件负责定义你的项目中的所有子项目
- android/app/build.gradle: 这个文件定义了你的主应用程序的依赖。CLI 会自动添加 implementation project(':react-native-some-package') 这样的依赖声明，确保你的主应用程序可以访问原生模块的代码。
- android/app/src/main/java/.../MainApplication.java: 这是你的 React Native 应用的入口点，负责注册所有原生包。在自动链接之前，你需要手动在 getPackages() 方法中添加 new SomePackage()。

4. Gradle 构建：
一旦上述文件被修改，当你运行 npx react-native run-android 时，Gradle 构建系统会根据这些最新的配置，编译所有原生模块，并将它们打包到最终的 APK 中。

## 常见问题

### 1. 已经安装 Node.js，但是报错 `org.gradle.process.internal.ExecException: A problem occurred starting process 'command 'node'`
大概率是你在使用 nvm 或者 asdf 之类的工具管理 Node.js 版本，导致 Gradle 找不到 Node.js 可执行文件。  
有以下解决方案：
1. 创建符号链接
```bash
sudo ln -s "$(which node)" /usr/local/bin/node
```
2. 在 `android/gradle.properties` 文件中指定 Node.js 路径
```bash
# 其余配置保持不变

nodejs.dir=/Users/YOUR_USERNAME/.nvm/versions/node/v22.14.0 # 记得改为你自己的 Node.js 版本
```
3. 在 ~/.bashrc 或 ~/.zshrc 文件中添加 PATH:
```bash
# 记得改为你自己的 Node.js 版本
export PATH=/Users/YOUR_USERNAME/.nvm/versions/node/v22.14.0/bin:$PATH
```

### 2. Android 模拟器中报错，该如何拷贝或者记录下来？
Android Studio 左下角有个 `Logcat` 标签，点击它即可查看日志。  

### 3. 遇到奇怪问题时如何清除 Gradle 缓存？
```bash
cd android
./gradlew clean
```

### 4. 原生模块没有自动链接
自动链接过程发生在 `npx react-native android` 命令执行时。  
所以如果你选择在 Android Studio 中运行原生程序，那么自动链接不会发生。  