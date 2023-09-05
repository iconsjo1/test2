package com.united_doctors_hospital_udh;

import android.app.Activity;
import android.content.Intent;
import android.media.MediaPlayer;
import android.net.Uri;
import android.os.Build;
import android.os.Bundle;
import android.util.DisplayMetrics;
import android.util.Log;
import android.view.View;
import android.widget.RelativeLayout;
import android.widget.VideoView;

public class SplashVideoActivity extends Activity {

    private static final String TAG = "[VIDEO SPLASH ACTIVITY]";
    public static int HEIGHT;
    public static int WIDTH;

    @Override
    protected void onCreate(Bundle savedInstanceState) {
        super.onCreate(savedInstanceState);
        setContentView(R.layout.android_splash_video);
//        setVideoContainerDimensions();
        setUpVideoView();
    }

    protected void setUpVideoView() {
        VideoView splashVideo = (VideoView) findViewById(R.id.videoView);
        Uri videoPath = Uri.parse("android.resource://" + getPackageName() + "/" + R.raw.splash);
        splashVideo.setVideoURI(videoPath);
        this.HEIGHT = getScreenHeight();
        this.WIDTH = getScreenWidth();
        try {
            splashVideo.setOnCompletionListener(new MediaPlayer.OnCompletionListener() {
                @Override
                public void onCompletion(MediaPlayer mediaPlayer) {
                    startActivity(new Intent(SplashVideoActivity.this, MainActivity.class));
                    finish();
                }
            });
            splashVideo.start();
            splashVideo.setOnPreparedListener(new MediaPlayer.OnPreparedListener() {
                @Override
                public void onPrepared(MediaPlayer mp) {
                    float scale = 1.3f;
                    VideoView splashVideo = (VideoView) findViewById(R.id.videoView);
                    int videoWidth = splashVideo.getWidth();
                    int videoHeight = splashVideo.getHeight();
                    float scaleX = SplashVideoActivity.WIDTH / videoWidth;
                    float scaleY = SplashVideoActivity.HEIGHT / videoHeight;
                    splashVideo.setScaleX(scaleX * scale);
                    splashVideo.setScaleY(scaleY * scale);

                }
            });
        } catch (Exception e) {
            Log.i(TAG, e.toString());
            startActivity(new Intent(SplashVideoActivity.this, MainActivity.class));
            finish();
        }
    }

    @Override
    public void onWindowFocusChanged(boolean hasFocus) {
        super.onWindowFocusChanged(hasFocus);
        if (hasFocus) {
            hideSystemUI();
            playVideo();
        }
    }

    private void hideSystemUI() {
        View decorView = getWindow().getDecorView();
        decorView.setSystemUiVisibility(
                View.SYSTEM_UI_FLAG_IMMERSIVE
                        // Set the content to appear under the system bars so that the
                        // content doesn't resize when the system bars hide and show.
                        | View.SYSTEM_UI_FLAG_LAYOUT_STABLE
                        | View.SYSTEM_UI_FLAG_LAYOUT_HIDE_NAVIGATION
                        | View.SYSTEM_UI_FLAG_LAYOUT_FULLSCREEN
                        // Hide the nav bar and status bar
                        | View.SYSTEM_UI_FLAG_HIDE_NAVIGATION
                        // | View.SYSTEM_UI_FLAG_FULLSCREEN
        );
    }

    private int getScreenHeight() {
        DisplayMetrics displayMetrics = new DisplayMetrics();
        getWindowManager().getDefaultDisplay().getMetrics(displayMetrics);
        int height = displayMetrics.heightPixels;
        return height + getNavigationBarHeight();
    }

    private int getScreenWidth() {
        DisplayMetrics displayMetrics = new DisplayMetrics();
        getWindowManager().getDefaultDisplay().getMetrics(displayMetrics);
        int width = displayMetrics.widthPixels;
        return width;
    }

    private int getNavigationBarHeight() {
        if (Build.VERSION.SDK_INT >= Build.VERSION_CODES.JELLY_BEAN_MR1) {
            DisplayMetrics metrics = new DisplayMetrics();
            getWindowManager().getDefaultDisplay().getMetrics(metrics);
            int usableHeight = metrics.heightPixels;
            getWindowManager().getDefaultDisplay().getRealMetrics(metrics);
            int realHeight = metrics.heightPixels;
            if (realHeight > usableHeight)
                return realHeight - usableHeight;
            else
                return 0;
        }
        return 0;
    }

    private void playVideo() {
        VideoView splashVideo = (VideoView) findViewById(R.id.videoView);
        splashVideo.start();
    }

    public void setVideoContainerDimensions() {
        RelativeLayout videoContainer = findViewById(R.id.videoContainer);
        videoContainer.setLayoutParams(
                new RelativeLayout.LayoutParams(
                        (int) (getScreenWidth()),
                        (int) (getScreenHeight())
                )
        );
    }
}
