package config

type AppConfigOptFn func(*AppConfig)

func defaultOpts() *AppConfig {
	return &AppConfig{
		DSN:            "",
		MaxConnections: 1,
	}
}

type AppConfig struct {
	DSN            string
	MaxConnections int
}

func NewAppConfig(optFns ...AppConfigOptFn) *AppConfig {
	options := defaultOpts()

	for _, optFn := range optFns {
		optFn(options)
	}

	return &AppConfig{
		DSN:            options.DSN,
		MaxConnections: options.MaxConnections,
	}
}

func WithDSN(dsn string) AppConfigOptFn {
	return func(config *AppConfig) {
		config.DSN = dsn
	}
}

func WithMaxConnections(maxConnections int) AppConfigOptFn {
	return func(config *AppConfig) { config.MaxConnections = maxConnections }
}
