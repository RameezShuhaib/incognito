package com.incognitoapp;

import android.app.Application;

import com.facebook.react.ReactApplication;
import io.rumors.reactnativefirebaseui.RNFirebaseUiPackage;
import com.reactnative.ivpusic.imagepicker.PickerPackage;
import com.reactlibrary.securekeystore.RNSecureKeyStorePackage;
import com.airbnb.android.react.maps.MapsPackage;
import com.oblador.vectoricons.VectorIconsPackage;
import io.invertase.firebase.RNFirebasePackage;
import com.rt2zz.reactnativecontacts.ReactNativeContacts;
import com.jamesisaac.rnbackgroundtask.BackgroundTaskPackage;
import com.transistorsoft.rnbackgroundfetch.RNBackgroundFetchPackage;
import com.facebook.react.ReactNativeHost;
import com.facebook.react.ReactPackage;
import com.facebook.react.shell.MainReactPackage;
import com.facebook.soloader.SoLoader;

import java.util.Arrays;
import java.util.List;

public class MainApplication extends Application implements ReactApplication {

  private final ReactNativeHost mReactNativeHost = new ReactNativeHost(this) {
    @Override
    public boolean getUseDeveloperSupport() {
      return BuildConfig.DEBUG;
    }

    @Override
    protected List<ReactPackage> getPackages() {
      return Arrays.<ReactPackage>asList(
          new MainReactPackage(),
            new RNFirebaseUiPackage(),
            new PickerPackage(),
            new RNSecureKeyStorePackage(),
            new MapsPackage(),
            new VectorIconsPackage(),
            new RNFirebasePackage(),
            new ReactNativeContacts(),
            new BackgroundTaskPackage(),
            new RNBackgroundFetchPackage()
      );
    }

    @Override
    protected String getJSMainModuleName() {
      return "index";
    }
  };

  @Override
  public ReactNativeHost getReactNativeHost() {
    return mReactNativeHost;
  }

  @Override
  public void onCreate() {
    super.onCreate();
    SoLoader.init(this, /* native exopackage */ false);
  }
}
