package org.girsbrain.ccamp.round;

import android.app.Activity;
import android.os.AsyncTask;
import android.view.View;
import android.util.Log;
import android.os.Bundle;

import org.girsbrain.ccamp.round.Data.Loader;

import java.io.IOException;

public class MainScreen extends Activity {

    @Override
    protected void onCreate(Bundle savedInstanceState) {
        super.onCreate(savedInstanceState);
        setContentView(R.layout.activity_main_screen);

    }

    protected void fetchLibrary(View view) {
        new LoaderTask().execute();
    }

    private class LoaderTask extends AsyncTask<Void, Void, Void> {
        @Override
        protected Void doInBackground(Void... voids) {
            Log.d("DURP", "Fetching Library...");

            Loader loader = new Loader(((App)getApplication()).getDaoSession());
            try {
                loader.Load();
            } catch (IOException e) {
                Log.d("DURP", e.getMessage());
            }

            return null;
        }
    }
}
