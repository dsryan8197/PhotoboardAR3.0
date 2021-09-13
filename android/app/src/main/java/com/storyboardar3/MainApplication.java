package com.storyboardar3;

import android.app.Application;

import com.facebook.react.ReactApplication;
import com.reactnativecommunity.asyncstorage.AsyncStoragePackage;
import com.anyline.RNImageToPDF.RNImageToPdfPackage;
import com.swmansion.gesturehandler.react.RNGestureHandlerPackage;
import com.vinzscam.reactnativefileviewer.RNFileViewerPackage;
import fr.greweb.reactnativeviewshot.RNViewShotPackage;
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
            new AsyncStoragePackage(),
            new RNImageToPdfPackage(),
            new RNGestureHandlerPackage(),
            new RNFileViewerPackage(),
            new RNViewShotPackage()
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
